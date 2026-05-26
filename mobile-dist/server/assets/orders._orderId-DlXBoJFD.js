import { J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { i as Route, d as Link, c as House, P as Package, u as formatGNF, M as MessageCircle } from "./router-pZ3dyLDZ.js";
import { u as useOrders, S as STATUS_FLOW, f as formatDate, a as STATUS_LABEL, e as estimatedDelivery } from "./orders-store-Bso_GnWt.js";
import { C as ChevronLeft, T as Truck } from "./truck-DrsWnxrj.js";
import { C as CircleX } from "./circle-x-DBNgfENA.js";
import { C as CircleCheck } from "./circle-check-aDIaPYud.js";
import { C as Clock } from "./clock-QJ3gwoKO.js";
import { M as MapPin } from "./map-pin-CY5YqRrW.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const STEP_ICONS = {
  received: CircleCheck,
  preparing: Clock,
  shipped: Package,
  delivering: Truck,
  delivered: House
};
function OrderDetailPage() {
  const {
    orderId
  } = Route.useParams();
  const order = useOrders((s) => s.orders.find((o) => o.id === orderId));
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Commande introuvable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "mt-3 inline-flex rounded-full bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]", children: "Voir mes commandes" })
    ] });
  }
  const currentIdx = STATUS_FLOW.indexOf(order.status);
  const isCancelled = order.status === "cancelled";
  const waMessage = encodeURIComponent(`Bonjour, j'ai besoin d'aide concernant ma commande ${order.id}.`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 px-4 py-4 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground", "aria-label": "Retour aux commandes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-base font-bold text-foreground", children: order.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Passée le ",
          formatDate(order.createdAt)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Suivi de livraison" }),
      isCancelled ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-destructive/10 p-3 text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "Commande annulée" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80", children: "Contactez le support pour plus d'informations." })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative space-y-5 pl-1", children: STATUS_FLOW.map((step, idx) => {
        const Icon = STEP_ICONS[step];
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        const isLast = idx === STATUS_FLOW.length - 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative flex items-start gap-3", children: [
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-[18px] top-9 h-[calc(100%+4px)] w-0.5 ${done ? "bg-success" : "bg-border"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 ${active ? "border-primary bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : done ? "border-success bg-success text-success-foreground" : "border-border bg-card text-muted-foreground"}`, children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm font-semibold ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`, children: STATUS_LABEL[step] }),
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "En cours…" })
          ] })
        ] }, step);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Articles" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: formatGNF(order.total) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
        " Adresse de livraison"
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
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-2 text-xs text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-primary" }),
        "Livraison estimée :",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: estimatedDelivery(order.delivery.city) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/224620212045?text=${waMessage}`, target: "_blank", rel: "noopener noreferrer", className: "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] text-sm font-bold text-white shadow-[var(--shadow-glow)] transition active:scale-[0.98]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
      " Contacter le support"
    ] })
  ] });
}
export {
  OrderDetailPage as component
};
