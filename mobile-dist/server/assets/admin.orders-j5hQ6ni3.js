import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { u as useOrders, a as STATUS_LABEL, f as formatDate } from "./orders-store-Bso_GnWt.js";
import { u as formatGNF, f as Printer } from "./router-pZ3dyLDZ.js";
import { X } from "./x-gfbicER3.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const STATUS_OPTS = ["received", "preparing", "shipped", "delivering", "delivered", "cancelled"];
const STATUS_STYLE = {
  received: "bg-blue-50 text-blue-700 border-blue-200",
  preparing: "bg-amber-50 text-amber-700 border-amber-200",
  shipped: "bg-violet-50 text-violet-700 border-violet-200",
  delivering: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200"
};
function OrdersAdminPage() {
  const {
    orders
  } = useOrders();
  const [filter, setFilter] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (q) {
        const hay = `${o.id} ${o.delivery.fullName} ${o.delivery.phone} ${o.delivery.city}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [orders, filter, query]);
  const updateStatus = (id, status) => {
    useOrders.setState({
      orders: useOrders.getState().orders.map((o) => o.id === id ? {
        ...o,
        status
      } : o)
    });
    setSelected((cur) => cur && cur.id === id ? {
      ...cur,
      status
    } : cur);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Commandes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mt-0.5", children: [
        filtered.length,
        " commandes"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Rechercher (n°, client, ville, téléphone)…", className: "flex-1 min-w-[200px] px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tous statuts" }),
        STATUS_OPTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABEL[s] }, s))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50 text-slate-600 text-xs uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "N°" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Téléphone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Ville" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right font-medium", children: "Articles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right font-medium", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Paiement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Statut" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtered.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-slate-100 hover:bg-slate-50 cursor-pointer", onClick: () => setSelected(o), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-mono text-xs", children: o.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: o.delivery.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-slate-600", children: o.delivery.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-slate-600", children: o.delivery.city }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right", children: o.items.reduce((a, i) => a + i.qty, 0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-semibold", children: formatGNF(o.total) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-slate-600", children: o.payment.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-slate-600", children: formatDate(o.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLE[o.status]}`, children: STATUS_LABEL[o.status] }) })
        ] }, o.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-3 py-12 text-center text-sm text-slate-500", children: "Aucune commande trouvée." }) })
      ] })
    ] }) }) }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDetailModal, { order: selected, onClose: () => setSelected(null), onUpdateStatus: (s) => updateStatus(selected.id, s) })
  ] });
}
function OrderDetailModal({
  order,
  onClose,
  onUpdateStatus
}) {
  const printInvoice = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    const itemsHtml = order.items.map((i) => `<tr><td>${i.name}</td><td>${i.qty}</td><td style="text-align:right">${formatGNF(i.price)}</td><td style="text-align:right">${formatGNF(i.price * i.qty)}</td></tr>`).join("");
    w.document.write(`<!doctype html><html><head><title>Facture ${order.id}</title>
      <style>body{font-family:system-ui;padding:32px;color:#0f172a}h1{margin:0 0 8px}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{padding:8px;border-bottom:1px solid #e2e8f0;text-align:left}th{background:#f8fafc}.tot{font-weight:700;font-size:18px;margin-top:24px;text-align:right}</style></head><body>
      <h1>SC TECHNOLOGIE</h1><p>Facture <strong>${order.id}</strong> — ${formatDate(order.createdAt)}</p>
      <p><strong>Client:</strong> ${order.delivery.fullName}<br/><strong>Téléphone:</strong> ${order.delivery.phone}<br/><strong>Adresse:</strong> ${order.delivery.address}, ${order.delivery.district}, ${order.delivery.city}</p>
      <table><thead><tr><th>Produit</th><th>Qté</th><th style="text-align:right">PU</th><th style="text-align:right">Total</th></tr></thead><tbody>${itemsHtml}</tbody></table>
      <p class="tot">Sous-total : ${formatGNF(order.subtotal)}<br/>TVA : ${formatGNF(order.tva)}<br/>Total TTC : ${formatGNF(order.total)}</p>
      <p>Paiement : ${order.payment.label}</p>
      <script>window.print()<\/script></body></html>`);
    w.document.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: order.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: formatDate(order.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "h-8 w-8 rounded-md hover:bg-slate-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5 text-slate-500" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500 uppercase", children: "Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-1", children: order.delivery.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: order.delivery.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: order.delivery.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500 uppercase", children: "Livraison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 mt-1", children: order.delivery.address }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-600", children: [
              order.delivery.district,
              ", ",
              order.delivery.city
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500 uppercase mb-2", children: "Articles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: order.items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-md flex-shrink-0", style: {
              background: i.image
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: i.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
                i.brand,
                " · ×",
                i.qty
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: formatGNF(i.price * i.qty) })
          ] }, i.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-200 pt-3 space-y-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Sous-total", value: formatGNF(order.subtotal) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "TVA", value: formatGNF(order.tva) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Total TTC", value: formatGNF(order.total), bold: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Paiement", value: order.payment.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-slate-500 uppercase", children: "Statut :" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: order.status, onChange: (e) => onUpdateStatus(e.target.value), className: "text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white", children: STATUS_OPTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABEL[s] }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: printInvoice, className: "ml-auto inline-flex items-center gap-1.5 text-sm border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            " Imprimer la facture"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Row({
  label,
  value,
  bold
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: bold ? "font-bold" : "font-medium", children: value })
  ] });
}
export {
  OrdersAdminPage as component
};
