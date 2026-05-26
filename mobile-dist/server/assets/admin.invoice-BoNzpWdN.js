import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as toast } from "./index-BzhLcmdF.js";
import { E as useAdminData, f as Printer, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { u as useOrders, g as generateOrderId } from "./orders-store-Bso_GnWt.js";
import { S as Save } from "./save-Cw3KM0zy.js";
import { P as Plus } from "./plus-CT5QbIWM.js";
import { T as Trash2 } from "./trash-2-C0nachgY.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ManualInvoicePage() {
  const {
    products,
    settings
  } = useAdminData();
  const addOrder = useOrders((s) => s.addOrder);
  const [customer, setCustomer] = reactExports.useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    city: "Conakry"
  });
  const [paymentLabel, setPaymentLabel] = reactExports.useState("Espèces");
  const [items, setItems] = reactExports.useState([{
    id: crypto.randomUUID(),
    name: "",
    qty: 1,
    price: 0
  }]);
  const [tvaRate, setTvaRate] = reactExports.useState(Math.round((settings.vatRate ?? 0.18) * 100));
  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0);
  const tva = Math.round(subtotal * tvaRate / 100);
  const total = subtotal + tva;
  const productOptions = reactExports.useMemo(() => products.filter((p) => p.active), [products]);
  const updateItem = (id, patch) => setItems((arr) => arr.map((i) => i.id === id ? {
    ...i,
    ...patch
  } : i));
  const removeItem = (id) => setItems((arr) => arr.length > 1 ? arr.filter((i) => i.id !== id) : arr);
  const addItem = () => setItems((arr) => [...arr, {
    id: crypto.randomUUID(),
    name: "",
    qty: 1,
    price: 0
  }]);
  const pickProduct = (id, productId) => {
    const p = products.find((pp) => pp.id === productId);
    if (!p) return;
    updateItem(id, {
      productId,
      name: p.name,
      price: p.price
    });
  };
  const validate = () => {
    if (!customer.fullName.trim()) return "Le nom du client est requis";
    if (!customer.phone.trim()) return "Le téléphone du client est requis";
    const valid = items.every((i) => i.name.trim() && i.qty > 0 && i.price >= 0);
    if (!valid) return "Chaque ligne doit avoir un produit, une quantité et un prix";
    return null;
  };
  const buildOrder = () => ({
    id: generateOrderId(),
    createdAt: Date.now(),
    status: "received",
    items: items.map((i) => ({
      id: i.productId ?? i.id,
      name: i.name,
      brand: "",
      image: "",
      qty: i.qty,
      price: i.price
    })),
    subtotal,
    tva,
    total,
    delivery: {
      fullName: customer.fullName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      district: customer.district,
      city: customer.city,
      notes: "Facture manuelle"
    },
    payment: {
      method: "card",
      label: paymentLabel,
      masked: "—"
    }
  });
  const saveOrder = () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    addOrder(buildOrder());
    toast.success("Facture enregistrée dans les commandes");
  };
  const printInvoice = () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    const order = buildOrder();
    const w = window.open("", "_blank");
    if (!w) return;
    const rows = order.items.map((i) => `<tr><td>${escape(i.name)}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">${formatGNF(i.price)}</td><td style="text-align:right">${formatGNF(i.price * i.qty)}</td></tr>`).join("");
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Facture ${order.id}</title>
      <style>
      body{font-family:system-ui,Segoe UI,Roboto;padding:32px;color:#0f172a;max-width:780px;margin:auto}
      .head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0f172a;padding-bottom:16px;margin-bottom:24px}
      .brand{font-size:24px;font-weight:800;letter-spacing:-0.02em}
      .sub{color:#475569;font-size:12px}
      h2{margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.08em;color:#475569}
      table{width:100%;border-collapse:collapse;margin-top:8px}
      th,td{padding:8px 10px;border-bottom:1px solid #e2e8f0;text-align:left;font-size:13px}
      th{background:#f8fafc;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#475569}
      .totals{margin-top:16px;margin-left:auto;width:300px}
      .totals .row{display:flex;justify-content:space-between;padding:6px 0;font-size:13px}
      .totals .grand{border-top:2px solid #0f172a;font-weight:800;font-size:16px;padding-top:10px;margin-top:6px}
      .pay{margin-top:24px;padding:12px;background:#f8fafc;border-radius:8px;font-size:12px}
      .foot{margin-top:32px;text-align:center;color:#64748b;font-size:11px}
      </style></head><body>
      <div class="head">
        <div>
          <div class="brand">SC TECHNOLOGIE</div>
          <div class="sub">${escape(settings.address)}</div>
          <div class="sub">${escape(settings.contactPhone)} • ${escape(settings.contactEmail)}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:18px;font-weight:700">FACTURE</div>
          <div class="sub">N° ${order.id}</div>
          <div class="sub">${new Date(order.createdAt).toLocaleDateString("fr-FR")}</div>
        </div>
      </div>

      <h2>Client</h2>
      <div style="font-size:13px;line-height:1.5">
        <strong>${escape(customer.fullName)}</strong><br/>
        ${escape(customer.phone)}${customer.email ? " • " + escape(customer.email) : ""}<br/>
        ${escape(customer.address)}${customer.district ? ", " + escape(customer.district) : ""}, ${escape(customer.city)}
      </div>

      <h2>Détails</h2>
      <table>
        <thead><tr><th>Produit</th><th style="text-align:center">Qté</th><th style="text-align:right">PU</th><th style="text-align:right">Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>

      <div class="totals">
        <div class="row"><span>Sous-total HT</span><strong>${formatGNF(subtotal)} GNF</strong></div>
        <div class="row"><span>TVA (${tvaRate}%)</span><strong>${formatGNF(tva)} GNF</strong></div>
        <div class="row grand"><span>Total TTC</span><span>${formatGNF(total)} GNF</span></div>
      </div>

      <div class="pay">
        <strong>Mode de paiement :</strong> ${escape(paymentLabel)}<br/>
        <strong>Orange Money marchand :</strong> 610-95-38-38 • SC TECHNOLOGIE
      </div>

      <div class="foot">Merci de votre confiance — SC TECHNOLOGIE • Guinée</div>
      <script>window.print()<\/script>
      </body></html>`);
    w.document.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Nouvelle facture" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Créez une facture client directement et imprimez-la" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: saveOrder, className: "inline-flex items-center gap-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Enregistrer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: printInvoice, className: "inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
          " Imprimer"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-slate-900", children: "Client" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Nom complet *", value: customer.fullName, onChange: (v) => setCustomer({
          ...customer,
          fullName: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Téléphone *", value: customer.phone, onChange: (v) => setCustomer({
          ...customer,
          phone: v
        }), placeholder: "+224 …" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", value: customer.email, onChange: (v) => setCustomer({
          ...customer,
          email: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Ville", value: customer.city, onChange: (v) => setCustomer({
          ...customer,
          city: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Adresse", value: customer.address, onChange: (v) => setCustomer({
          ...customer,
          address: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Quartier", value: customer.district, onChange: (v) => setCustomer({
          ...customer,
          district: v
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-slate-900", children: "Articles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: addItem, className: "inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Ajouter une ligne"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wide text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-left font-medium", children: "Produit / Désignation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-right font-medium w-24", children: "Qté" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-right font-medium w-40", children: "Prix unit. (GNF)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-right font-medium w-32", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-8" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-slate-100 align-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-2 py-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: i.productId ?? "", onChange: (e) => pickProduct(i.id, e.target.value), className: "w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Sélectionner un produit (ou saisir libre) —" }),
              productOptions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: i.name, onChange: (e) => updateItem(i.id, {
              name: e.target.value,
              productId: void 0
            }), placeholder: "Désignation", className: "w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: i.qty, onChange: (e) => updateItem(i.id, {
            qty: Math.max(1, Number(e.target.value))
          }), className: "w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-sm text-right" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: i.price, onChange: (e) => updateItem(i.id, {
            price: Math.max(0, Number(e.target.value))
          }), className: "w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-sm text-right" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 text-right font-semibold whitespace-nowrap", children: formatGNF(i.qty * i.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(i.id), className: "text-slate-400 hover:text-red-600 p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
        ] }, i.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-slate-900", children: "Paiement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: paymentLabel, onChange: (e) => setPaymentLabel(e.target.value), className: "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Espèces" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Orange Money" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Carte bancaire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Virement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "À crédit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500", children: [
          "Orange Money marchand : ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-[#FF6600]", children: "610-95-38-38" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-slate-900 mb-1", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Sous-total HT", value: `${formatGNF(subtotal)} GNF` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-600", children: [
            "TVA",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 100, value: tvaRate, onChange: (e) => setTvaRate(Math.max(0, Math.min(100, Number(e.target.value)))), className: "mx-1 w-12 px-1.5 py-0.5 border border-slate-300 rounded text-xs text-right" }),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            formatGNF(tva),
            " GNF"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-200 pt-2 flex items-center justify-between text-base font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total TTC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-700", children: [
            formatGNF(total),
            " GNF"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Input({
  label,
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-medium text-slate-700 mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), placeholder, className: "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: value })
  ] });
}
function escape(s) {
  return (s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
export {
  ManualInvoicePage as component
};
