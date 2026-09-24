import { readdir, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
export async function checkBudgets(root='dist') {
 let js=0,css=0,total=0;const violations=[];
 async function visit(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);if(entry.isDirectory()){await visit(file);continue;}
  const data=await readFile(file);total+=data.length;
  if(file.endsWith('.js'))js+=gzipSync(data).length;
  if(file.endsWith('.css'))css+=gzipSync(data).length;
  if(/\.(webp|jpg|png)$/.test(file)&&data.length>250000)violations.push(`${file}: image exceeds 250 kB`);
 }}
 await visit(root);
 if(js>155000)violations.push(`JavaScript gzip ${js} > 155000`);
 if(css>20000)violations.push(`CSS gzip ${css} > 20000`);
 if(total>6500000)violations.push(`Distribution ${total} > 6500000`);
 console.log(JSON.stringify({budgets:{jsGzip:js,cssGzip:css,distribution:total}}));
 if(violations.length)throw Error(violations.join('\n'));
}
if(process.argv[1]?.endsWith('check-budgets.mjs'))await checkBudgets(process.argv[2]||'dist');
