import { J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { d as Link } from "./router-pZ3dyLDZ.js";
import { P as ProductCard } from "./ProductCard-Cjf6UcoN.js";
import { a as useNewArrivalProducts } from "./storefront-Pr0p4otx.js";
import { A as ArrowLeft } from "./arrow-left-8opedRDk.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./check-BCGJc5o2.js";
function NouveautesPage() {
  const items = useNewArrivalProducts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground hover:border-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Nouveautés" })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground", children: "Aucune nouveauté pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
  ] });
}
export {
  NouveautesPage as component
};
