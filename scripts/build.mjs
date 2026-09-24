import { build, loadEnv } from 'vite';
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const args=process.argv.slice(2);
const release=args.includes('--release');
const index=args.indexOf('--outDir');
const outDir=resolve(index>=0?args[index+1]:'dist');
const env=loadEnv('production',process.cwd(),'');
const raw=process.env.SITE_URL||env.SITE_URL||'';
let siteUrl='';
if(raw){const u=new URL(raw);if(!['http:','https:'].includes(u.protocol)||u.search||u.hash)throw Error('SITE_URL must be an absolute URL without query/hash.');if(release&&u.protocol!=='https:')throw Error('Release SITE_URL must use HTTPS.');siteUrl=u.href.replace(/\/?$/,'/');}
if(release&&!siteUrl)throw Error('Configure SITE_URL with the definitive public address before building a release.');
const ssrDir=resolve('.cache/prerender');
await build({build:{outDir}});
await build({build:{ssr:'src/entry-server.tsx',outDir:ssrDir,emptyOutDir:true,rolldownOptions:{output:{entryFileNames:'render.mjs',manualChunks:undefined}}}});
const {render}=await import(pathToFileURL(resolve(ssrDir,'render.mjs')).href);
const {html:appHtml,organization}=render(siteUrl);
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const seo=siteUrl?[
 `<link rel="canonical" href="${escape(siteUrl)}" />`,
 `<meta property="og:url" content="${escape(siteUrl)}" />`,
 `<meta property="og:image" content="${escape(new URL('og-kelka.jpg',siteUrl).href)}" />`,
 `<meta name="twitter:image" content="${escape(new URL('og-kelka.jpg',siteUrl).href)}" />`,
 `<script type="application/ld+json">${JSON.stringify(organization).replaceAll('<','\\u003c')}</script>`,
].join('\n'):'<meta name="robots" content="noindex, nofollow" />';
let html=await readFile(resolve(outDir,'index.html'),'utf8');
html=html.replace('<!-- SEO -->',seo).replace('<div id="root"></div>',`<div id="root">${appHtml}</div>`);
await writeFile(resolve(outDir,'index.html'),html);
await cp('deploy/dist.htaccess',resolve(outDir,'.htaccess'));
await cp('static/404.html',resolve(outDir,'404.html'));
if(siteUrl){
 const sitemap=new URL('sitemap.xml',siteUrl).href;
 await writeFile(resolve(outDir,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`);
 await writeFile(resolve(outDir,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl)}</loc></url></urlset>\n`);
}else await writeFile(resolve(outDir,'robots.txt'),'User-agent: *\nDisallow: /\n');
await mkdir('.cache',{recursive:true});
await writeFile('.cache/build-info.json',JSON.stringify({siteUrl:siteUrl||null,release,outDir},null,2));
await rm(ssrDir,{recursive:true,force:true});
console.log(`Prerendered landing: ${siteUrl||'preview (noindex; configure SITE_URL for publication)'}`);
const {checkBudgets}=await import('./check-budgets.mjs');
await checkBudgets(outDir);
