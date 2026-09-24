import { renderToString } from 'react-dom/server';
import App from './App';
import { site } from './data/site';
export function render(url: string) {
  return {html:renderToString(<App />),organization:{
    '@context':'https://schema.org','@type':'Organization','@id':`${url}#organization`,
    name:'Kelka',url,logo:url ? new URL('logo-kelka.png',url).href : undefined,
    description:'Fabricante de tapetes higiênicos para cães',telephone:site.phoneHref,email:site.email,
    areaServed:['Santa Catarina','Paraná','Rio Grande do Sul'],
  }};
}
