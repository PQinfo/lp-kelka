import assert from 'node:assert/strict';
const address=process.argv[2]||process.env.SMOKE_URL;
if(!address)throw Error('Usage: npm run smoke -- https://your-domain.example/');
const base=new URL(address.endsWith('/')?address:address+'/');
const response=await fetch(base);
assert.equal(response.status,200,'Landing must return 200');
const html=await response.text();
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Exactly one prerendered h1');
for(const content of ['Proteção em cada camada','Fofuxão','70 × 60 cm','data-faq-answer']) assert.ok(html.includes(content),`Missing initial content: ${content}`);
assert.ok(!html.includes('SEU-DOMINIO'),'Placeholder domain must not be published');
for(const file of ['nonexistent-kelka-smoke','nested/unknown','package.json','src/main.tsx','.git/config','.env']){
 const result=await fetch(new URL(file,base),{method:'HEAD'});
 assert.equal(result.status,404,`${file} must not be publicly served`);
}
const scripts=[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match=>match[1]);
const styles=[...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(match=>match[1]);
assert.ok(scripts.length&&styles.length,'Missing scripts/styles');
for(const asset of [...scripts,...styles]){
 const result=await fetch(new URL(asset,base),{method:'HEAD'});
 assert.equal(result.status,200,asset);
 assert.ok(/(?:javascript|css)/.test(result.headers.get('content-type')||''),`Wrong MIME: ${asset}`);
 if(!process.argv.includes('--skip-headers'))assert.match(result.headers.get('cache-control')||'',/immutable/,`Cache missing: ${asset}`);
}
const robots=await fetch(new URL('robots.txt',base));
assert.equal(robots.status,200);assert.match(robots.headers.get('content-type')||'',/text\/plain/);
if(html.includes('rel="canonical"')){
 const sitemap=await fetch(new URL('sitemap.xml',base));assert.equal(sitemap.status,200);
 assert.match(sitemap.headers.get('content-type')||'',/xml/);
 const canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];
 assert.ok((await sitemap.text()).includes(`<loc>${canonical}</loc>`));
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.equal(schema['@type'],'Organization');
}else assert.ok(html.includes('noindex'),'Preview must not be indexed');
if(!process.argv.includes('--skip-headers')){
 assert.equal(response.headers.get('x-content-type-options'),'nosniff');
 assert.match(response.headers.get('content-security-policy')||'',/object-src 'none'/);
 assert.match(response.headers.get('cache-control')||'',/no-cache/);
}
console.log(`Smoke passed: ${base.href}`);
