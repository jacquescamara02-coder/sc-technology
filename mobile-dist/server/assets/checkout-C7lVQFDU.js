import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { G as useNavigate, F as useCart, d as Link, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { u as useOrders } from "./orders-store-Bso_GnWt.js";
import { C as ChevronLeft, T as Truck } from "./truck-DrsWnxrj.js";
import { C as CreditCard } from "./credit-card-ZgvAdf2V.js";
import { C as ClipboardCheck } from "./clipboard-check-KrVvX7sM.js";
import { C as ChevronDown } from "./chevron-down-Cg6D_Xfd.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
import { C as Check } from "./check-BCGJc5o2.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const CITIES = ["Conakry", "Labé", "Kankan", "N'Zérékoré", "Kindia", "Faranah", "Mamou", "Siguiri", "Boké", "Coyah", "Autre"];
const TVA_RATE = 0.18;
const STEPS = [{
  id: 1,
  label: "Livraison",
  icon: Truck
}, {
  id: 2,
  label: "Paiement",
  icon: CreditCard
}, {
  id: 3,
  label: "Confirmation",
  icon: ClipboardCheck
}];
function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const subtotal = items.reduce((a, i) => a + i.qty * i.product.price, 0);
  const tva = Math.round(subtotal * TVA_RATE);
  const total = subtotal + tva;
  const setDelivery = useOrders((s) => s.setDelivery);
  const savedDelivery = useOrders((s) => s.delivery);
  const [summaryOpen, setSummaryOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(savedDelivery ?? {
    fullName: "",
    phone: "+224 ",
    email: "",
    city: "",
    district: "",
    address: "",
    notes: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Votre panier est vide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ajoutez des produits pour passer commande." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-3 inline-flex rounded-full bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]", children: "Continuer mes achats" })
    ] });
  }
  const setField = (k, v) => {
    setForm((f) => ({
      ...f,
      [k]: v
    }));
    if (errors[k]) setErrors((e) => ({
      ...e,
      [k]: void 0
    }));
  };
  const validate = () => {
    const e = {};
    if (form.fullName.trim().length < 3) e.fullName = "Nom complet requis (min. 3 caractères)";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!/^224\d{8,9}$/.test(phoneDigits)) e.phone = "Téléphone invalide (format +224 XXX XXX XXX)";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.city) e.city = "Sélectionnez une ville";
    if (form.district.trim().length < 2) e.district = "Quartier requis";
    if (form.address.trim().length < 5) e.address = "Adresse complète requise";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setDelivery(form);
    navigate({
      to: "/checkout/payment"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4 pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", className: "grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground", "aria-label": "Retour au panier", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold tracking-tight text-foreground", children: "Commander" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center gap-2", children: STEPS.map((s, i) => {
      const active = s.id === 1;
      const Icon = s.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-1 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-9 w-9 place-items-center rounded-full border-2 ${active ? "border-primary bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "border-border bg-card text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-semibold ${active ? "text-primary" : "text-muted-foreground"}`, children: s.label })
        ] }),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }, s.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 rounded-2xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-muted-foreground", children: "Informations de livraison" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom complet", error: errors.fullName, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.fullName, onChange: (e) => setField("fullName", e.target.value), placeholder: "Mamadou Diallo", maxLength: 100, className: inputCls(errors.fullName) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone", error: errors.phone, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.phone, onChange: (e) => setField("phone", e.target.value), placeholder: "+224 6XX XX XX XX", inputMode: "tel", maxLength: 20, className: inputCls(errors.phone) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email (optionnel)", error: errors.email, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.email, onChange: (e) => setField("email", e.target.value), placeholder: "vous@exemple.com", type: "email", maxLength: 120, className: inputCls(errors.email) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ville", error: errors.city, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.city, onChange: (e) => setField("city", e.target.value), className: `${inputCls(errors.city)} appearance-none pr-9`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Sélectionnez votre ville" }),
              CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quartier / Commune", error: errors.district, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.district, onChange: (e) => setField("district", e.target.value), placeholder: "Kaloum, Ratoma, Matam...", maxLength: 80, className: inputCls(errors.district) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Adresse complète", error: errors.address, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.address, onChange: (e) => setField("address", e.target.value), placeholder: "Rue, numéro, point de repère", maxLength: 200, className: inputCls(errors.address) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instructions spéciales (optionnel)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.notes, onChange: (e) => setField("notes", e.target.value), placeholder: "Étage, horaires, indications utiles...", rows: 3, maxLength: 400, className: `${inputCls()} resize-none` }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card lg:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSummaryOpen((v) => !v), className: "flex w-full items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
              "Récapitulatif (",
              items.length,
              " article",
              items.length > 1 ? "s" : "",
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-primary", children: formatGNF(total) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 text-muted-foreground transition ${summaryOpen ? "rotate-180" : ""}` })
            ] })
          ] }),
          summaryOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryContent, { items, subtotal, tva, total }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98]", children: [
          "Continuer vers le paiement ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20 space-y-3 rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-muted-foreground", children: "Votre commande" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryContent, { items, subtotal, tva, total })
      ] }) })
    ] })
  ] });
}
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-semibold text-foreground", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-destructive", children: error })
  ] });
}
function inputCls(error) {
  return `h-11 w-full rounded-xl border bg-surface px-3 text-sm text-foreground outline-none transition focus:ring-2 ${error ? "border-destructive focus:border-destructive focus:ring-destructive/30" : "border-border focus:border-primary focus:ring-primary/30"}`;
}
function SummaryContent({
  items,
  subtotal,
  tva,
  total
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: items.map(({
      product,
      qty
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-12 w-12 shrink-0 rounded-lg", style: {
        backgroundImage: product.image
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground", children: qty }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-1 text-xs font-semibold text-foreground", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: product.brand })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-foreground", children: formatGNF(product.price * qty) })
    ] }, product.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 border-t border-border pt-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Sous-total", value: formatGNF(subtotal) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Livraison", value: "À calculer", muted: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "TVA (18%)", value: formatGNF(tva) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "TOTAL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: formatGNF(total) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-[11px] text-success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
      " Paiement à la livraison disponible"
    ] })
  ] });
}
function Row({
  label,
  value,
  muted = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted ? "text-muted-foreground" : "font-medium text-foreground", children: value })
  ] });
}
export {
  CheckoutPage as component
};
