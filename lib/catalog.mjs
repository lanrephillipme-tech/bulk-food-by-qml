import { randomUUID } from 'node:crypto';
import { catalogProducts, catalogCategories, catalogSources, catalogForms, catalogUnits, catalogHabitats, countryCodes } from './catalog-data.mjs';

const response = (data, statusCode = 200) => ({ data, statusCode });
const fail = (message, statusCode = 400) => { throw Object.assign(new Error(message), { statusCode }); };
const clean = value => String(value ?? '').trim();
export const normalizeSearch = value => clean(value).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
const integer = (value, name, min = 0) => {
  if (!Number.isSafeInteger(value) || value < min) fail(`${name} must be an integer of at least ${min}`);
  return value;
};
function location(value) {
  if (!value || !countryCodes.includes(value.country)) fail('Select a supported country');
  if (!clean(value.locality)) fail('Locality is required');
  if (value.latitude != null || value.longitude != null) {
    if (!Number.isFinite(value.latitude) || !Number.isFinite(value.longitude) || Math.abs(value.latitude) > 90 || Math.abs(value.longitude) > 180) fail('Invalid coordinates');
  }
  return Object.fromEntries(['country','admin1','admin2','locality','localityType','placeId','pickupPoint','latitude','longitude'].filter(key => value[key] != null).map(key => [key,value[key]]));
}
export function validateListing(body) {
  if (!catalogUnits.includes(body.unit)) fail('Unsupported unit');
  if (!catalogForms.includes(body.form)) fail('Select a product form');
  if (!/^[A-Z]{3}$/.test(body.currency || '')) fail('Currency must be a three-letter code');
  try { if (!Intl.supportedValuesOf('currency').includes(body.currency)) fail('Unsupported currency'); } catch (error) { if (error.statusCode) throw error; }
  const price = clean(body.price_minor);
  if (!/^[1-9]\d{0,14}$/.test(price)) fail('Price must be positive integer minor units');
  const pack = integer(body.pack_quantity, 'Pack quantity', 1);
  const minimum = integer(body.minimum_order, 'Minimum order', 1);
  const stock = integer(body.stock, 'Stock');
  if (!Array.isArray(body.images) || !body.images.length || body.images.length > 8 || body.images.some(url => { try { return new URL(url).protocol !== 'https:'; } catch { return true; } })) fail('Provide 1 to 8 HTTPS seller photograph URLs');
  const fulfillment = body.fulfillment || {};
  if (!fulfillment.pickup && !fulfillment.delivery) fail('Choose pickup or delivery');
  if (fulfillment.delivery && (!Array.isArray(fulfillment.countries) || !fulfillment.countries.length || fulfillment.countries.some(c => !countryCodes.includes(c)))) fail('Select delivery countries');
  if (body.net_quantity != null && (!Number.isSafeInteger(body.net_quantity) || body.net_quantity <= 0 || !['g','ml'].includes(body.net_unit))) fail('Net quantity must be an integer in g or ml');
  if (body.habitat && !catalogHabitats.includes(body.habitat)) fail('Unsupported habitat');
  if (body.claims?.length) fail('Certification claims require a reviewed evidence workflow; omit unverified claims');
  return {
    product_id:clean(body.product_id), variety:clean(body.variety).slice(0,120), breed:clean(body.breed).slice(0,120),
    brand:clean(body.brand).slice(0,120), grade:clean(body.grade).slice(0,80), form:body.form,
    price_minor:price, currency:body.currency, unit:body.unit, pack_quantity:pack,
    minimum_order:minimum, stock, net_quantity:body.net_quantity ?? null, net_unit:body.net_quantity ? body.net_unit : null,
    origin:location(body.origin), location:location(body.location), habitat:body.habitat || null,
    fulfillment:{pickup:!!fulfillment.pickup, delivery:!!fulfillment.delivery, countries:fulfillment.delivery ? [...new Set(fulfillment.countries)] : []},
    images:body.images, preorder:body.preorder === true, status:'pending'
  };
}
export function comparisonKey(offer) {
  const weight = offer.unit === 'kg' || offer.unit === 'g' || offer.net_unit === 'g';
  const volume = offer.unit === 'litre' || offer.unit === 'ml' || offer.net_unit === 'ml';
  const measure = weight ? 'g' : volume ? 'ml' : ['piece','dozen'].includes(offer.unit) ? 'piece' : null;
  if (!measure || !offer.grade) return null;
  return [offer.product_id,offer.form,offer.variety,offer.breed,offer.brand,offer.grade,offer.currency,measure].join('|');
}
export function unitPrice(offer) {
  if (!comparisonKey(offer)) return null;
  const factors = {kg:1000,g:1,litre:1000,ml:1,piece:1,dozen:12};
  const quantity = factors[offer.unit] ? factors[offer.unit] * offer.pack_quantity : offer.net_quantity;
  // Preserve a rational value. UI rounding never changes order amounts.
  return { numerator:String(offer.price_minor), denominator:String(quantity), per:['kg','g'].includes(offer.unit) ? 'g' : ['litre','ml'].includes(offer.unit) ? 'ml' : offer.net_unit || 'piece' };
}
export function distanceKm(a,b) {
  if (![a?.latitude,a?.longitude,b?.latitude,b?.longitude].every(Number.isFinite)) return null;
  const rad = x => x*Math.PI/180, dlat=rad(b.latitude-a.latitude), dlon=rad(b.longitude-a.longitude);
  const h=Math.sin(dlat/2)**2+Math.cos(rad(a.latitude))*Math.cos(rad(b.latitude))*Math.sin(dlon/2)**2;
  return 6371*2*Math.asin(Math.min(1,Math.sqrt(h)));
}
export function availability(offer, destination, radius) {
  if (offer.stock <= 0) return offer.preorder ? 'Preorder' : 'Out of stock';
  const distance = distanceKm(offer.location,destination);
  if (distance != null && radius != null && distance <= radius && offer.fulfillment.pickup) return 'Available nearby';
  if (destination?.country && offer.fulfillment.delivery && offer.fulfillment.countries.includes(destination.country)) return 'Deliverable to you';
  return offer.fulfillment.pickup ? 'Pickup available' : 'Select delivery location';
}
export async function catalogRequest({ method,path,query={},body={},headers={},db,authenticate }) {
  if (!path.startsWith('/api/catalog')) return null;
  try {
    const read = async (table, filter='') => db ? db.select(table,'*',filter) : table === 'catalog_products' ? catalogProducts : table === 'catalog_categories' ? catalogCategories : [];
    const user = async (admin=false) => {
      if (!db) fail('Persistent catalog storage is not configured',503);
      const identity = await authenticate(headers);
      if (!identity?.id) fail('Sign in to continue',401);
      if (admin && !['admin','super_admin'].includes(identity.app_metadata?.role)) fail('Administrator permission required',403);
      return identity;
    };
    if (path === '/api/catalog/meta' && method === 'GET') return response({ categories:await read('catalog_categories'), forms:catalogForms, units:catalogUnits, habitats:catalogHabitats, countries:countryCodes, sources:catalogSources, mode:db?'database':'reference-only', localRadiusKm:process.env.CATALOG_LOCAL_RADIUS_KM ? Number(process.env.CATALOG_LOCAL_RADIUS_KM) : null });
    if (path === '/api/catalog/products' && method === 'GET') {
      let products = (await read('catalog_products', 'status=eq.active')).filter(p=>p.status==='active');
      const offers = await read('catalog_listings','status=eq.published');
      const term=normalizeSearch(query.q);
      products=products.filter(p => (!term || normalizeSearch([p.name,...p.aliases,...(p.local_names||[]).map(n=>n.name)].join(' ')).includes(term)) && (!query.category || p.category_id===query.category || p.category_id.startsWith(query.category+'/')) && (!query.tag || p.tags.includes(query.tag)));
      const matching = o => (!query.form || o.form===query.form) && (!query.unit || o.unit===query.unit) && (!query.country || o.location.country===query.country) && (!query.stock || o.stock>0) && (!query.fulfillment || o.fulfillment[query.fulfillment]===true) && (!query.currency || o.currency===query.currency) && (!query.min || BigInt(o.price_minor)>=BigInt(query.min)) && (!query.max || BigInt(o.price_minor)<=BigInt(query.max));
      if ((query.min || query.max) && !query.currency) fail('Select currency before filtering prices');
      for (const key of ['min','max']) if(query[key] && !/^\d+$/.test(query[key])) fail('Invalid price filter');
      const filterOffers = ['form','unit','country','stock','fulfillment','currency','min','max'].some(key=>query[key]);
      const items=products.map(p=>({...p,offer_count:offers.filter(o=>o.product_id===p.id&&matching(o)).length})).filter(p=>!filterOffers||p.offer_count>0).sort((a,b)=>a.name.localeCompare(b.name)* (query.sort==='name-desc'?-1:1));
      const page=Math.max(1,parseInt(query.page)||1), limit=Math.min(60,Math.max(1,parseInt(query.limit)||24));
      return response({items:items.slice((page-1)*limit,page*limit),total:items.length,page,limit,mode:db?'database':'reference-only'});
    }
    const detail=path.match(/^\/api\/catalog\/products\/([a-z0-9-]+)$/);
    if(detail && method==='GET') {
      const product=(await read('catalog_products',`id=eq.${detail[1]}`)).find(p=>p.id===detail[1]);
      if(!product) fail('Product not found',404);
      const destination={country:query.country,latitude:query.lat==null?null:Number(query.lat),longitude:query.lng==null?null:Number(query.lng)};
      const radius=process.env.CATALOG_LOCAL_RADIUS_KM ? Number(process.env.CATALOG_LOCAL_RADIUS_KM) : null;
      const offers=(await read('catalog_listings',`status=eq.published&product_id=eq.${product.id}`)).filter(o=>o.product_id===product.id&&o.status==='published').map(o=>({...o,comparison_key:comparisonKey(o),unit_price:unitPrice(o),distance_km:distanceKm(o.location,destination),availability:availability(o,destination,radius)}));
      return response({product,offers});
    }
    if(path==='/api/catalog/seller' && method==='POST') {
      const actor=await user();
      const types=['farmer','market-trader','grocery-retailer','livestock-seller','wholesaler','cooperative','ingredient-supplier'];
      if(!clean(body.name)||!Array.isArray(body.business_types)||!body.business_types.length||body.business_types.some(t=>!types.includes(t))) fail('Business name and valid business types required');
      return response(await db.upsert('catalog_sellers',{id:actor.id,name:clean(body.name).slice(0,160),business_types:body.business_types,location:location(body.location)}));
    }
    if(path==='/api/catalog/listings' && method==='POST') {
      const actor=await user(); const listing=validateListing(body);
      const product=(await read('catalog_products',`id=eq.${encodeURIComponent(listing.product_id)}`))[0];
      if(!product||product.status!=='active') fail('Select an active catalog product');
      const seller=(await read('catalog_sellers',`id=eq.${actor.id}`))[0];
      if(!seller) fail('Create your seller profile first');
      return response(await db.insert('catalog_listings',{...listing,id:randomUUID(),seller_id:actor.id,seller_name:seller.name}),201);
    }
    if(path==='/api/catalog/suggestions' && method==='POST') {
      const actor=await user();
      if(clean(body.name).length<2||!clean(body.reason)) fail('Name and description required');
      return response(await db.insert('catalog_suggestions',{id:randomUUID(),owner_id:actor.id,name:clean(body.name).slice(0,160),reason:clean(body.reason).slice(0,2000),status:'pending'}),201);
    }
    if(path==='/api/catalog/mine' && method==='GET') {
      const actor=await user(); return response({listings:await read('catalog_listings',`seller_id=eq.${actor.id}`),suggestions:await read('catalog_suggestions',`owner_id=eq.${actor.id}`),orders:await read('catalog_orders',`buyer_id=eq.${actor.id}`)});
    }
    if(path==='/api/catalog/checkout' && method==='POST') {
      const actor=await user();
      if(!/^[a-zA-Z0-9_-]{16,100}$/.test(body.reference||'')) fail('Stable checkout reference required');
      if(!Array.isArray(body.items)||!body.items.length||body.items.length>40) fail('Select 1 to 40 offers');
      for(const item of body.items) { integer(item.quantity,'Quantity',1); if(!/^[0-9a-f-]{36}$/.test(item.id)||!/^\d+$/.test(String(item.price_minor))) fail('Invalid offer'); }
      const destination=location(body.destination);
      if(!['pickup','delivery'].includes(body.fulfillment)) fail('Choose fulfillment');
      return response(await db.rpc('qml_catalog_checkout',{p_buyer:actor.id,p_reference:body.reference,p_items:body.items,p_destination:destination,p_fulfillment:body.fulfillment}),201);
    }
    if(path==='/api/catalog/admin' && method==='GET') {
      await user(true); return response({listings:await read('catalog_listings','status=eq.pending'),suggestions:await read('catalog_suggestions','status=eq.pending')});
    }
    if(path==='/api/catalog/admin/review' && method==='POST') {
      const actor=await user(true);
      if(!['publish','reject','retire','merge','approve-suggestion'].includes(body.action)) fail('Unsupported review action');
      if(!clean(body.reason)) fail('Review reason required');
      return response(await db.rpc('qml_catalog_review',{p_actor:actor.id,p_action:body.action,p_id:clean(body.id),p_target:clean(body.target),p_reason:clean(body.reason)}));
    }
    return response({error:'Catalog route not found'},404);
  } catch(error) { return response({error:error.statusCode ? error.message : 'Catalog operation failed. Check configuration or request status before retrying.'},error.statusCode||503); }
}
