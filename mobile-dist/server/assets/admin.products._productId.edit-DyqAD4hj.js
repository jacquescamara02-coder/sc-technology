import { J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { m as Route, E as useAdminData, d as Link } from "./router-pZ3dyLDZ.js";
import { P as ProductForm } from "./ProductForm-DHSKMPMu.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./facebook-Vbgem2Ck.js";
import "./index-BzhLcmdF.js";
import "./trash-2-C0nachgY.js";
import "./plus-CT5QbIWM.js";
import "./upload-BQzeo5Td.js";
import "./x-gfbicER3.js";
function EditProductPage() {
  const {
    productId
  } = Route.useParams();
  const product = useAdminData((s) => s.products.find((p) => p.id === productId));
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center mx-auto py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600", children: "Produit introuvable." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/products", className: "text-blue-600 hover:underline mt-2 inline-block", children: "← Retour aux produits" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, { initial: product });
}
export {
  EditProductPage as component
};
