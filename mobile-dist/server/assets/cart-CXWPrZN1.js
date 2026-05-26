import { J as jsxRuntimeExports, S as reactExports } from "./server-DZhSK7L0.js";
import { F as useCart, n as ShoppingBag, d as Link, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { T as Trash2 } from "./trash-2-C0nachgY.js";
import { M as Minus } from "./minus-Bc1ChSDm.js";
import { P as Plus } from "./plus-CT5QbIWM.js";
import { A as ArrowRight } from "./arrow-right-CMhWi8u5.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const TVA_RATE = 0.18;
function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = items.reduce((a, i) => a + i.qty * i.product.price, 0);
  const tva = Math.round(subtotal * TVA_RATE);
  const total = subtotal + tva;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-24 w-24 place-items-center rounded-3xl bg-[image:var(--gradient-primary)]/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Votre panier est vide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xs text-sm text-muted-foreground", children: "Parcourez nos catégories et ajoutez vos premiers produits pour commencer." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-3 inline-flex rounded-full bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]", children: "Découvrir les produits" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4 pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Mon panier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        if (confirm("Vider tout le panier ?")) clear();
      }, className: "inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
        " Vider"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: items.map(({
      product,
      qty
    }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwipeRow, { onDelete: () => remove(product.id), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-2xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$productId", params: {
        productId: product.id
      }, className: "h-20 w-20 shrink-0 rounded-xl", style: {
        backgroundImage: product.image
      }, "aria-label": product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: product.brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$productId", params: {
              productId: product.id
            }, className: "line-clamp-1 text-sm font-semibold text-foreground hover:text-primary", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
              formatGNF(product.price),
              " / unité"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(product.id), className: "text-muted-foreground hover:text-destructive", "aria-label": "Supprimer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full border border-border bg-surface", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(product.id, qty - 1), className: "grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground", "aria-label": "Diminuer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-xs font-semibold", children: qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(product.id, qty + 1), className: "grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground", "aria-label": "Augmenter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-foreground", children: formatGNF(product.price * qty) })
        ] })
      ] })
    ] }) }, product.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Sous-total", value: formatGNF(subtotal) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Livraison", value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "À calculer" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "TVA (18%)", value: formatGNF(tva) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 border-t border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "TOTAL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary", children: formatGNF(total) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", className: "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98]", children: [
      "Passer la commande ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
    ] })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: value })
  ] });
}
function SwipeRow({
  children,
  onDelete
}) {
  const [offset, setOffset] = reactExports.useState(0);
  const startX = reactExports.useRef(null);
  const currentX = reactExports.useRef(0);
  const onStart = (x) => {
    startX.current = x;
    currentX.current = offset;
  };
  const onMove = (x) => {
    if (startX.current === null) return;
    const delta = x - startX.current;
    const next = Math.min(0, Math.max(-120, currentX.current + delta));
    setOffset(next);
  };
  const onEnd = () => {
    startX.current = null;
    if (offset < -80) {
      onDelete();
    } else if (offset < -40) {
      setOffset(-80);
    } else {
      setOffset(0);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 flex w-24 items-center justify-center bg-destructive text-destructive-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onDelete, className: "flex flex-col items-center gap-1 text-xs font-semibold", "aria-label": "Supprimer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }),
      "Supprimer"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      transform: `translateX(${offset}px)`
    }, className: "transition-transform duration-150", onTouchStart: (e) => onStart(e.touches[0].clientX), onTouchMove: (e) => onMove(e.touches[0].clientX), onTouchEnd: onEnd, onMouseDown: (e) => onStart(e.clientX), onMouseMove: (e) => e.buttons === 1 && onMove(e.clientX), onMouseUp: onEnd, onMouseLeave: () => startX.current !== null && onEnd(), children })
  ] });
}
export {
  CartPage as component
};
