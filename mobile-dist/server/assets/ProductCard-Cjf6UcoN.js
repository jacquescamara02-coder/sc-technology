import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { F as useCart, d as Link, u as formatGNF, o as ShoppingCart } from "./router-pZ3dyLDZ.js";
import { C as Check } from "./check-BCGJc5o2.js";
function ProductCard({ product, className = "" }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = reactExports.useState(false);
  const inStock = product.stock > 0;
  const handleAdd = () => {
    if (!inStock) return;
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: `group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:-translate-y-0.5 ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/product/$productId",
            params: { productId: product.id },
            className: "relative block aspect-square overflow-hidden bg-cover bg-center",
            style: { backgroundImage: product.image },
            "aria-label": `Voir ${product.name}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" }),
              product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${product.badge === "Promo" ? "bg-destructive text-destructive-foreground" : product.badge === "Nouveau" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}`,
                  children: product.badge
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur ${inStock ? "bg-background/70 text-success" : "bg-background/70 text-destructive"}`,
                  children: inStock ? `En stock` : "Rupture"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-2 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: product.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$productId", params: { productId: product.id }, className: "line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:text-primary", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: formatGNF(product.price) }) }),
            product.oldPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground line-through", children: formatGNF(product.oldPrice) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleAdd,
              disabled: !inStock,
              className: "mt-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[image:var(--gradient-primary)] text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
              children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                " Ajouté"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
                " Ajouter"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
