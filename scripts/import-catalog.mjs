import { catalogCategories, catalogProducts, catalogSources } from '../lib/catalog-data.mjs';
const apply=process.argv.includes('--apply');
for(const rows of [catalogCategories,catalogProducts,catalogSources]) {
 if(new Set(rows.map(r=>r.id)).size!==rows.length) throw new Error('Duplicate catalog IDs');
}
console.log(JSON.stringify({products:catalogProducts.length,categories:catalogCategories.length,sources:catalogSources.length,mode:apply?'apply':'dry-run',sellerInventory:0}));
if(apply) {
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key) throw new Error('Set server-side Supabase URL and service role key');
 for(const [table,rows] of [['catalog_sources',catalogSources],['catalog_categories',catalogCategories],['catalog_products',catalogProducts]]) {
  // Never overwrite subsequent moderator edits on a repeated starter import.
  const response=await fetch(`${url}/rest/v1/${table}`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'resolution=ignore-duplicates'},body:JSON.stringify(rows)});
  if(!response.ok) throw new Error(`Import failed for ${table}: HTTP ${response.status}`);
 }
}
