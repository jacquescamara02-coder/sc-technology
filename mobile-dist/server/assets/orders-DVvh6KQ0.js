import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, d as Link, P as Package, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { u as useOrders, f as formatDate, a as STATUS_LABEL } from "./orders-store-Bso_GnWt.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
const FILTERS = [{
  id: "all",
  label: "Toutes"
}, {
  id: "active",
  label: "En cours"
}, {
  id: "delivered",
  label: "Livrées"
}, {
  id: "cancelled",
  label: "Annulées"
}];
function matchFilter(s, f) {
  if (f === "all") return true;
  if (f === "delivered") return s === "delivered";
  if (f === "cancelled") return s === "cancelled";
  return s !== "delivered" && s !== "cancelled";
}
const STATUS_COLOR = {
  received: "bg-primary/10 text-primary",
  preparing: "bg-warning/10 text-warning",
  shipped: "bg-primary/10 text-primary",
  delivering: "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive"
};
function OrdersListPage() {
  const orders = useOrders((s) => s.orders);
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => orders.filter((o) => matchFilter(o.status, filter)), [orders, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Mes commandes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Historique et suivi de vos achats" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar flex gap-2 overflow-x-auto -mx-1 px-1", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f.id), className: `shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${filter === f.id ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "border border-border bg-card text-muted-foreground"}`, children: f.label }, f.id)) }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-surface text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: "Aucune commande" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xs text-xs text-muted-foreground", children: "Vous n'avez pas encore de commande dans cette catégorie. Découvrez nos produits." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-2 inline-flex rounded-full bg-[image:var(--gradient-primary)] px-5 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow)]", children: "Explorer la boutique" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: filtered.map((o) => {
      const count = o.items.reduce((a, i) => a + i.qty, 0);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/$orderId", params: {
        orderId: o.id
      }, className: "block rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground", children: o.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-xs text-muted-foreground", children: [
              formatDate(o.createdAt),
              " • ",
              count,
              " article",
              count > 1 ? "s" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_COLOR[o.status]}`, children: STATUS_LABEL[o.status] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground", children: formatGNF(o.total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
          ] })
        ] })
      ] }) }, o.id);
    }) })
  ] });
}
export {
  OrdersListPage as component
};
