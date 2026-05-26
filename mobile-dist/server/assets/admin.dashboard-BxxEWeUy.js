import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, E as useAdminData, P as Package, n as ShoppingBag, u as formatGNF, d as Link } from "./router-pZ3dyLDZ.js";
import { u as useOrders, a as STATUS_LABEL } from "./orders-store-Bso_GnWt.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const STATUS_OPTS = ["received", "preparing", "shipped", "delivering", "delivered", "cancelled"];
function DashboardPage() {
  const {
    products
  } = useAdminData();
  const {
    orders,
    addOrder
  } = useOrders();
  const stats = reactExports.useMemo(() => {
    const totalProducts = products.length;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();
    const todayOrders = orders.filter((o) => o.createdAt >= todayMs).length;
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
    const monthRevenue = orders.filter((o) => o.createdAt >= monthStart && o.status !== "cancelled").reduce((acc, o) => acc + o.total, 0);
    const outOfStock = products.filter((p) => p.stock === 0).length;
    return {
      totalProducts,
      todayOrders,
      monthRevenue,
      outOfStock
    };
  }, [products, orders]);
  const lowStock = reactExports.useMemo(() => products.filter((p) => p.stock > 0 && p.stock < 5).slice(0, 8), [products]);
  const recentOrders = orders.slice(0, 8);
  const updateStatus = (orderId, status) => {
    const o = useOrders.getState().orders.find((x) => x.id === orderId);
    if (!o) return;
    useOrders.setState({
      orders: useOrders.getState().orders.map((x) => x.id === orderId ? {
        ...x,
        status
      } : x)
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Tableau de bord" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Vue d'ensemble de votre boutique" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Produits", value: stats.totalProducts.toString(), icon: Package, color: "blue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Commandes aujourd'hui", value: stats.todayOrders.toString(), icon: ShoppingBag, color: "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "CA du mois", value: formatGNF(stats.monthRevenue), icon: TrendingUp, color: "violet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Rupture de stock", value: stats.outOfStock.toString(), icon: TriangleAlert, color: "red" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white border border-slate-200 rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-slate-200 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Commandes récentes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", className: "text-sm text-blue-600 hover:underline", children: "Voir tout" })
        ] }),
        recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-slate-500", children: "Aucune commande pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50 text-slate-600 text-xs uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "N° commande" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Paiement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Statut" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentOrders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: o.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: o.delivery.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: formatGNF(o.total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-600", children: o.payment.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onChange: (e) => updateStatus(o.id, e.target.value), className: "text-xs border border-slate-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500", children: STATUS_OPTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABEL[s] }, s)) }) })
          ] }, o.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Stock faible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: "Produits avec moins de 5 unités" })
        ] }),
        lowStock.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-slate-500", children: "Aucune alerte 🎉" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-slate-100", children: lowStock.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-5 py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg flex-shrink-0", style: {
            background: p.images[0]
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: p.brand })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full", children: [
            p.stock,
            " en stock"
          ] })
        ] }, p.id)) })
      ] })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon,
  color
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
    red: "bg-red-50 text-red-600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl lg:text-2xl font-bold text-slate-900 mt-1 truncate", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-xl flex items-center justify-center ${colorMap[color]}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) })
  ] }) });
}
export {
  DashboardPage as component
};
