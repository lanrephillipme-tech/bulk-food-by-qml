import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogRequest, validateListing, comparisonKey, unitPrice, availability, distanceKm } from '../lib/catalog.mjs';
import { catalogProducts } from '../lib/catalog-data.mjs';
const offer=()=>({product_id:'qml-rice',form:'whole',grade:'A',variety:'basmati',unit:'bag',pack_quantity:1,net_quantity:10000,net_unit:'g',minimum_order:1,stock:10,price_minor:'2400000',currency:'NGN',images:['https://example.com/rice.jpg'],origin:{country:'NG',locality:'Kano'},location:{country:'NG',locality:'Lagos',latitude:6.5,longitude:3.3},fulfillment:{pickup:true,delivery:true,countries:['NG']}});
test('catalog IDs unique and definitions contain no invented inventory',()=>{assert.equal(new Set(catalogProducts.map(p=>p.id)).size,catalogProducts.length);assert.ok(catalogProducts.every(p=>!('stock' in p)&&!('price' in p)));});
test('aliases, Unicode, pagination and category filters work without inventory',async()=>{
 for(const q of ['rice','米','أرز']){const r=await catalogRequest({path:'/api/catalog/products',method:'GET',query:{q}});assert.equal(r.statusCode,200);assert.ok(r.data.items.some(p=>p.id==='qml-rice'));}
 const r=await catalogRequest({path:'/api/catalog/products',method:'GET',query:{category:'live-animals',limit:'2'}});assert.equal(r.data.items.length,2);assert.ok(r.data.total>2);assert.ok(r.data.items.every(p=>p.category_id.startsWith('live-animals/')));
 const empty=await catalogRequest({path:'/api/catalog/products',method:'GET',query:{stock:'yes'}});assert.equal(empty.data.total,0);
});
test('listing validates quantities, photographs, units, location and unverified claims',()=>{
 assert.equal(validateListing(offer()).status,'pending');
 for(const change of [{price_minor:'-1'},{stock:1.2},{unit:'unknown'},{net_quantity:0},{images:['javascript:alert(1)']},{location:{country:'XX',locality:'x'}},{claims:['organic']},{location:{country:'NG',locality:'Lagos',latitude:100,longitude:0}}])assert.throws(()=>validateListing({...offer(),...change}));
});
test('bag comparison requires net quantity and matching specifications',()=>{
 const a=validateListing(offer());const b={...a,unit:'kg',pack_quantity:10};assert.equal(comparisonKey(a),comparisonKey(b));assert.deepEqual(unitPrice(a),unitPrice(b));
 assert.equal(comparisonKey({...a,net_quantity:null,net_unit:null}),null);
 assert.notEqual(comparisonKey(a),comparisonKey({...a,variety:'jasmine'}));assert.notEqual(comparisonKey(a),comparisonKey({...a,currency:'USD'}));
});
test('proximity uses coordinates and explicit radius, not fictional distances',()=>{
 assert.equal(distanceKm({},{}),null);assert.equal(distanceKm(offer().location,offer().location),0);
 assert.equal(availability(offer(),offer().location,null),'Deliverable to you');
 assert.equal(availability(offer(),offer().location,2),'Available nearby');
 assert.equal(availability({...offer(),stock:0},{country:'NG'},2),'Out of stock');
 assert.equal(availability({...offer(),stock:0,preorder:true},{country:'NG'},2),'Preorder');
});
test('publishing fails closed without storage or identity',async()=>{
 const request={path:'/api/catalog/listings',method:'POST',body:offer()};
 assert.equal((await catalogRequest(request)).statusCode,503);
 assert.equal((await catalogRequest({...request,db:{},authenticate:async()=>null})).statusCode,401);
});
test('admin ignores user-editable role metadata',async()=>{
 const r=await catalogRequest({path:'/api/catalog/admin',method:'GET',db:{},authenticate:async()=>({id:'a',user_metadata:{role:'admin'}})});assert.equal(r.statusCode,403);
});
test('price filters require a currency and reject malformed numbers',async()=>{
 for(const query of [{min:'1'},{currency:'NGN',min:'oops'}])assert.equal((await catalogRequest({path:'/api/catalog/products',method:'GET',query})).statusCode,400);
});
