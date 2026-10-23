const root=document.querySelector('#catalog');
const notice=document.querySelector('#notice');
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={meta:null,filters:{},page:1,cart:[],offers:[],product:null,view:'browse'};
let requestSequence=0;
const money=(minor,currency)=>new Intl.NumberFormat(undefined,{style:'currency',currency}).format(Number(minor)/10**new Intl.NumberFormat(undefined,{style:'currency',currency}).resolvedOptions().maximumFractionDigits);
async function api(path,body){
 let token;try{token=JSON.parse(localStorage.getItem('qmlAuthSession')||'null')?.token;}catch{}
 const response=await fetch('/api/catalog'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)});
 const result=await response.json();if(!response.ok)throw new Error(result.error||'Request failed');return result;
}
function options(values,selected='',blank='Any'){return `<option value="">${blank}</option>`+values.map(x=>{const value=typeof x==='string'?x:x.id;return `<option value="${esc(value)}" ${value===selected?'selected':''}>${esc(typeof x==='string'?x:x.name)}</option>`;}).join('');}
function countries(selected='',blank='Any country'){const names=new Intl.DisplayNames(['en'],{type:'region'});return options(state.meta.countries.map(id=>({id,name:names.of(id)})),selected,blank);}
function field(name,label,type='text',value='',extra=''){return `<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" ${extra}></label>`;}
function select(name,label,values,selected=''){return `<label>${label}<select name="${name}">${options(values,selected)}</select></label>`;}
function locationFields(prefix){return `<label>Country<select name="${prefix}_country" required>${countries('','Select country')}</select></label>${field(prefix+'_admin1','State / province')}${field(prefix+'_admin2','District / LGA')}${field(prefix+'_locality','City / town / village','text','','required')}${select(prefix+'_localityType','Locality type',['city','town','village'])}${field(prefix+'_pickupPoint','Market / pickup point')}${field(prefix+'_latitude','Latitude','number','','step="any" min="-90" max="90"')}${field(prefix+'_longitude','Longitude','number','','step="any" min="-180" max="180"')}`;}
function readLocation(data,prefix){const result={};for(const key of ['country','admin1','admin2','locality','localityType','pickupPoint','latitude','longitude']){const value=data[prefix+'_'+key];if(value)result[key]=['latitude','longitude'].includes(key)?Number(value):value;}return result;}
function count(){document.querySelector('#count').textContent=state.cart.reduce((n,x)=>n+x.quantity,0);}
async function browse(){
 const sequence=++requestSequence;
 root.innerHTML='<p role="status">Loading products...</p>';
 const params=new URLSearchParams({...state.filters,page:state.page});
 const data=await api('/products?'+params);if(sequence!==requestSequence)return;
 const f=state.filters;
 root.innerHTML=`<h1>Food and farm ingredients worldwide</h1>${state.meta.mode==='reference-only'?'<p class="muted">Reference catalog. No live seller inventory is connected.</p>':''}<form id="search">
 ${field('q','Search ingredients','search',f.q)}${select('category','Category',state.meta.categories,f.category)}${select('form','Form',state.meta.forms,f.form)}${select('unit','Unit',state.meta.units,f.unit)}
 <label>Seller country<select name="country">${countries(f.country)}</select></label>${select('fulfillment','Fulfillment',['pickup','delivery'],f.fulfillment)}${select('stock','Stock',[{id:'yes',name:'In stock'}],f.stock)}${field('currency','Currency code','text',f.currency,'maxlength="3"')}${field('min','Minimum price (minor units)','number',f.min,'min="0"')}${field('max','Maximum price (minor units)','number',f.max,'min="0"')}${select('sort','Sort',[{id:'name-asc',name:'Name A-Z'},{id:'name-desc',name:'Name Z-A'}],f.sort)}
 <button class="primary">Apply</button><button type="button" data-reset>Reset</button></form>
 <div class="tags">${Object.entries(f).map(([key,value])=>`<button data-remove-filter="${esc(key)}">${esc(key)}: ${esc(value)} ×</button>`).join('')}</div><p>${data.total} products</p>
 <section class="grid">${data.items.map(p=>`<button class="product" data-product="${p.id}"><small>${esc(p.category_id.split('/').slice(1).join(' / '))}</small><h2>${esc(p.name)}</h2><p>${p.offer_count?p.offer_count+' seller offers':'No current seller'}</p><small>${esc(p.aliases.slice(0,3).join(' · '))}</small></button>`).join('')}</section>
 ${!data.items.length?'<p class="empty">No matches. Clear filters or suggest a missing product.</p>':''}<div class="actions"><button data-page="${data.page-1}" ${data.page===1?'disabled':''}>Previous</button><span>Page ${data.page}</span><button data-page="${data.page+1}" ${data.page*data.limit>=data.total?'disabled':''}>Next</button></div>`;
}
async function detail(id){
 ++requestSequence;const result=await api('/products/'+encodeURIComponent(id));state.product=result.product;state.offers=result.offers;state.view='detail';const p=result.product;
 root.innerHTML=`<button data-view="browse">Back to catalog</button><h1>${esc(p.name)}</h1><p>${esc(p.description)}</p><p class="muted">${esc(p.aliases.join(' · '))}</p>${p.merged_into?`<button data-product="${esc(p.merged_into)}">View current product</button>`:''}
 <h2>Seller offers</h2>${!result.offers.length?'<p class="empty">No current seller. Check again later or list this product.</p>':''}
 ${result.offers.map((o,i)=>`<article class="offer"><img src="${esc(o.images[0])}" alt="${esc(p.name)} seller photograph"><div><h2>${esc(o.seller_name)}</h2><p>${esc([o.location.locality,o.location.country].join(', '))}</p><p>${esc([o.variety,o.form,o.grade].filter(Boolean).join(' · '))}</p><p class="amount">${money(o.price_minor,o.currency)} / ${o.pack_quantity} ${esc(o.unit)}</p><p>${esc(o.availability)} · ${o.stock} packs · minimum ${o.minimum_order}</p><small>${o.unit_price?`Unit rate: ${money(Number(o.unit_price.numerator)/Number(o.unit_price.denominator)*1000,o.currency)} / ${o.unit_price.per==='g'?'kg':o.unit_price.per==='ml'?'litre':'1,000 pieces'}. Compare only matching variety, form, grade and currency.`:'No comparable net measurement supplied.'}</small></div><div class="actions"><button data-add="${i}" ${o.stock<o.minimum_order?'disabled':''}>Add to cart</button></div></article>`).join('')}`;
}
function cart(){
 state.view='cart';root.innerHTML=`<h1>Your catalog cart</h1>${state.cart.length?state.cart.map((x,i)=>`<article class="row"><button data-product="${x.product_id}">${esc(x.name)} · ${esc(x.seller_name)}<br>${money(x.price_minor,x.currency)} / ${x.pack_quantity} ${esc(x.unit)}</button><label>Packs<input aria-label="Packs of ${esc(x.name)}" data-quantity="${i}" type="number" min="${x.minimum_order}" max="${x.stock}" value="${x.quantity}"></label><button data-remove="${i}">Remove</button></article>`).join(''):'<p>Your cart is empty.</p>'}
 ${state.cart.length?`<h2>Request a pickup quote</h2><form id="checkout">${locationFields('destination')}<button class="primary">Check prices and availability</button></form><p>No payment is collected. Delivery checkout requires a verified shipping quote.</p>`:''}`;
}
function sell(){
 state.view='sell';root.innerHTML=`<h1>Sell food and farm products</h1><h2>Seller profile</h2><form id="seller">${field('name','Business name','text','','required')}<label>Business types<select name="business_types" multiple required>${options(['farmer','market-trader','grocery-retailer','livestock-seller','wholesaler','cooperative','ingredient-supplier']).replace('<option value="">Any</option>','')}</select></label>${locationFields('seller')}<button class="primary">Save seller profile</button></form>
 <h2>New offer</h2><form id="listing">${field('product_search','Find catalog product','search')}<button type="button" data-find-product>Find</button><label>Catalog product<select name="product_id" id="product-select" required><option value="">Search above</option></select></label>
 ${field('variety','Variety')}${field('breed','Breed')}${field('brand','Brand')}${field('grade','Grade')}${select('form','Form',state.meta.forms)}${select('unit','Unit',state.meta.units)}${field('pack_quantity','Quantity per pack','number',1,'min="1" required')}${field('minimum_order','Minimum packs','number',1,'min="1" required')}${field('stock','Stock (packs)','number',0,'min="0" required')}${field('currency','Currency code','text','NGN','maxlength="3" required')}${field('price_minor','Price per pack (minor units)','number','','min="1" step="1" required')}${field('net_quantity','Declared net quantity per pack','number','','min="1"')}${select('net_unit','Net measurement',['g','ml'])}${select('habitat','Source habitat',state.meta.habitats)}
 <label class="wide">Seller photograph HTTPS URLs, one per line<textarea name="images" required></textarea></label><fieldset class="wide"><legend>Origin</legend><div class="grid">${locationFields('origin')}</div></fieldset><fieldset class="wide"><legend>Seller location</legend><div class="grid">${locationFields('location')}</div></fieldset><label><input type="checkbox" name="pickup" checked>Pickup</label><label><input type="checkbox" name="delivery">Delivery</label><label>Delivery countries<select name="delivery_countries" multiple>${countries()}</select></label><label><input type="checkbox" name="preorder">Accept preorders</label><button class="primary">Submit for review</button></form>`;
}
function suggest(){root.innerHTML=`<h1>Suggest a missing product</h1><form id="suggest">${field('name','Product name','text','','required')}<label class="wide">Local names, description and source references<textarea name="reason" required></textarea></label><button class="primary">Submit for review</button></form>`;}
async function admin(){const data=await api('/admin');root.innerHTML=`<h1>Catalog review</h1><h2>Pending offers</h2>${data.listings.map(o=>`<div class="row"><span>${esc(o.product_id)} · ${esc(o.seller_name)}</span><button data-review="publish" data-id="${o.id}">Publish</button><button data-review="reject" data-id="${o.id}">Reject</button></div>`).join('')||'<p>No pending offers.</p>'}<h2>Product suggestions</h2>${data.suggestions.map(s=>`<div class="row"><span>${esc(s.name)}: ${esc(s.reason)}</span><button data-review="approve-suggestion" data-id="${s.id}">Link reviewed product</button></div>`).join('')||'<p>No suggestions.</p>'}<h2>Retire or merge</h2><form id="review">${field('id','Source product ID','text','','required')}${select('action','Action',['retire','merge'])}${field('target','Merge target product ID')}${field('reason','Reason','text','','required')}<button>Submit</button></form>`;}
async function view(name){notice.textContent='';++requestSequence;state.view=name;if(name==='browse')return browse();if(name==='cart')return cart();if(name==='sell')return sell();if(name==='suggest')return suggest();if(name==='admin')return admin();}
document.addEventListener('click',async event=>{
 const button=event.target.closest('button');if(!button||button.disabled)return;
 try{
  if(button.dataset.view)return await view(button.dataset.view);
  if(button.dataset.product)return await detail(button.dataset.product);
  if(button.hasAttribute('data-reset')){state.filters={};state.page=1;return await browse();}
  if(button.dataset.removeFilter){delete state.filters[button.dataset.removeFilter];state.page=1;return await browse();}
  if(button.dataset.page){state.page=Number(button.dataset.page);return await browse();}
  if(button.dataset.add!=null){const offer=state.offers[Number(button.dataset.add)],existing=state.cart.find(x=>x.id===offer.id);if(existing)existing.quantity=Math.min(offer.stock,existing.quantity+1);else state.cart.push({...offer,name:state.product.name,quantity:offer.minimum_order});count();notice.textContent='Added to cart';}
  if(button.dataset.remove!=null){state.cart.splice(Number(button.dataset.remove),1);count();cart();}
  if(button.hasAttribute('data-find-product')){const q=new FormData(document.querySelector('#listing')).get('product_search');const data=await api('/products?q='+encodeURIComponent(q));document.querySelector('#product-select').innerHTML=options(data.items,'','Select product');}
  if(button.dataset.review){const reason=prompt('Review reason');if(!reason)return;const target=button.dataset.review==='approve-suggestion'?prompt('Reviewed catalog product ID'):'';if(target===null)return;await api('/admin/review',{id:button.dataset.id,action:button.dataset.review,target,reason});await admin();}
 }catch(error){notice.textContent=error.message;}
});
document.addEventListener('change',event=>{if(event.target.dataset.quantity!=null){const item=state.cart[Number(event.target.dataset.quantity)],n=Number(event.target.value);if(Number.isInteger(n)&&n>=item.minimum_order&&n<=item.stock)item.quantity=n;else event.target.value=item.quantity;count();}});
document.addEventListener('submit',async event=>{
 event.preventDefault();const form=event.target,fd=new FormData(form),data=Object.fromEntries(fd);const button=form.querySelector('button[type=submit],button.primary,button:last-child');if(button)button.disabled=true;
 try{
  if(form.id==='search'){state.filters=Object.fromEntries(Object.entries(data).filter(([,v])=>v));state.filters.currency=state.filters.currency?.toUpperCase()||'';state.page=1;await browse();return;}
  if(form.id==='seller')await api('/seller',{name:data.name,business_types:fd.getAll('business_types'),location:readLocation(data,'seller')});
  if(form.id==='listing')await api('/listings',{...data,price_minor:data.price_minor,currency:data.currency.toUpperCase(),pack_quantity:Number(data.pack_quantity),minimum_order:Number(data.minimum_order),stock:Number(data.stock),net_quantity:data.net_quantity?Number(data.net_quantity):null,images:data.images.split(/\r?\n/).map(x=>x.trim()).filter(Boolean),origin:readLocation(data,'origin'),location:readLocation(data,'location'),fulfillment:{pickup:fd.has('pickup'),delivery:fd.has('delivery'),countries:fd.getAll('delivery_countries').filter(Boolean)},preorder:fd.has('preorder')});
  if(form.id==='suggest')await api('/suggestions',data);
  if(form.id==='review')await api('/admin/review',data);
  if(form.id==='checkout'){const result=await api('/checkout',{reference:crypto.randomUUID(),items:state.cart.map(x=>({id:x.id,quantity:x.quantity,price_minor:String(x.price_minor)})),destination:readLocation(data,'destination'),fulfillment:'pickup'});notice.textContent=`Quote ${result.id}: ${money(result.total_minor,result.currency)}. Payment not collected; stock is not reserved.`;return;}
  notice.textContent='Saved. Submitted offers and suggestions require review.';
 }catch(error){notice.textContent=error.message;}finally{if(button)button.disabled=false;}
});
try{state.meta=await api('/meta');await browse();}catch(error){root.innerHTML='<h1>Catalog unavailable</h1><button data-view="browse">Retry</button>';notice.textContent=error.message;}
