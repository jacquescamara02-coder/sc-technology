import { J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { g as Route, d as Link, P as Package, u as formatGNF, p as Smartphone } from "./router-pZ3dyLDZ.js";
import { u as useOrders, e as estimatedDelivery } from "./orders-store-Bso_GnWt.js";
import { C as CircleCheck } from "./circle-check-aDIaPYud.js";
import { C as CreditCard } from "./credit-card-ZgvAdf2V.js";
import { M as MapPin } from "./map-pin-CY5YqRrW.js";
import { C as Clock } from "./clock-QJ3gwoKO.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function OrderSuccessPage() {
  const {
    id
  } = Route.useSearch();
  const order = useOrders((s) => id ? s.orders.find((o) => o.id === id) : s.orders[0]);
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Commande introuvable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-3 inline-flex rounded-full bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]", children: "Retour à l'accueil" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 px-4 py-6 pb-32 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-ping rounded-full bg-success/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid h-20 w-20 place-items-center rounded-full bg-success text-success-foreground shadow-[var(--shadow-glow)] animate-scale-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10", strokeWidth: 2.5 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-bold tracking-tight text-foreground", children: "Commande confirmée !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Merci pour votre commande. Un suivi vous sera envoyé." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: order.id })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Articles commandés" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: order.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-12 w-12 shrink-0 rounded-lg", style: {
          backgroundImage: it.image
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground", children: it.qty }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-1 text-xs font-semibold text-foreground", children: it.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: it.brand })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-foreground", children: formatGNF(it.price * it.qty) })
      ] }, it.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Total payé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: formatGNF(order.total) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
          order.payment.method === "orange_money" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3.5 w-3.5" }),
          "Paiement"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: order.payment.label }),
        order.payment.masked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: order.payment.masked })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          " Adresse"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: order.delivery.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          order.delivery.address,
          ", ",
          order.delivery.district,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          order.delivery.city,
          " • ",
          order.delivery.phone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-3 text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Livraison estimée :",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: estimatedDelivery(order.delivery.city) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$orderId", params: {
        orderId: order.id
      }, className: "flex h-12 items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]", children: "Suivre ma commande" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-bold text-foreground", children: "Continuer les achats" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pt-2 text-center text-xs text-muted-foreground", children: [
      "Merci de votre confiance.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "L'équipe SC TECHNOLOGIE" })
    ] })
  ] });
}
export {
  OrderSuccessPage as component
};
