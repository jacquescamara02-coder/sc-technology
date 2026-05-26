import { t as toast } from "./index-BzhLcmdF.js";
import { u as formatGNF, E as useAdminData } from "./router-pZ3dyLDZ.js";
function generateFacebookCaption(p) {
  const shortDesc = p.description.trim().split("\n").slice(0, 2).join("\n") || `${p.brand} — ${p.name}`;
  return `🆕 ${p.name}
💰 Prix : ${formatGNF(p.price)} GNF
📦 En stock : ${p.stock} unités

${shortDesc}

✅ Livraison disponible sur Conakry et toute la Guinée
📲 Commandez via notre application

#SCTechnology #Informatique #Guinée #Conakry`;
}
async function simulateFacebookPublish(p) {
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));
  const ok = Math.random() > 0.1;
  const post = {
    id: `fbp-${Date.now().toString(36)}`,
    productId: p.id,
    productName: p.name,
    productImage: p.images[0] ?? "",
    caption: generateFacebookCaption(p),
    date: (/* @__PURE__ */ new Date()).toISOString(),
    status: ok ? "success" : "failed"
  };
  useAdminData.getState().recordFacebookPost(post);
  if (ok) {
    toast.success("✅ Produit publié sur Facebook avec succès");
  } else {
    toast.error("❌ Échec de la publication sur Facebook");
  }
  return ok;
}
async function simulateFacebookTest(pageId, token) {
  await new Promise((r) => setTimeout(r, 900));
  return pageId.trim().length > 0 && token.trim().length >= 8;
}
export {
  simulateFacebookTest as a,
  generateFacebookCaption as g,
  simulateFacebookPublish as s
};
