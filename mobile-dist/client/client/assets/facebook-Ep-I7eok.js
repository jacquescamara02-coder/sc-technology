import{t as a}from"./index-GBAZvLrp.js";import{x as i,N as s}from"./index-CoeXXnjn.js";function r(t){const e=t.description.trim().split(`
`).slice(0,2).join(`
`)||`${t.brand} — ${t.name}`;return`🆕 ${t.name}
💰 Prix : ${i(t.price)} GNF
📦 En stock : ${t.stock} unités

${e}

✅ Livraison disponible sur Conakry et toute la Guinée
📲 Commandez via notre application

#SCTechnology #Informatique #Guinée #Conakry`}async function m(t){await new Promise(n=>setTimeout(n,1200+Math.random()*600));const e=Math.random()>.1,o={id:`fbp-${Date.now().toString(36)}`,productId:t.id,productName:t.name,productImage:t.images[0]??"",caption:r(t),date:new Date().toISOString(),status:e?"success":"failed"};return s.getState().recordFacebookPost(o),e?a.success("✅ Produit publié sur Facebook avec succès"):a.error("❌ Échec de la publication sur Facebook"),e}async function d(t,e){return await new Promise(o=>setTimeout(o,900)),t.trim().length>0&&e.trim().length>=8}export{d as a,r as g,m as s};
