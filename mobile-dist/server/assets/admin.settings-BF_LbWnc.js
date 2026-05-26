import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as toast } from "./index-BzhLcmdF.js";
import { E as useAdminData, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { a as simulateFacebookTest } from "./facebook-Vbgem2Ck.js";
import { F as Facebook } from "./facebook-Bn86WJ0n.js";
import { L as LoaderCircle } from "./loader-circle-Dt9PCMKq.js";
import { C as CircleCheck } from "./circle-check-aDIaPYud.js";
import { S as Save } from "./save-Cw3KM0zy.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function SettingsPage() {
  const {
    settings,
    updateSettings
  } = useAdminData();
  const [s, setS] = reactExports.useState(settings);
  const [saved, setSaved] = reactExports.useState(false);
  const [testing, setTesting] = reactExports.useState(false);
  const save = (e) => {
    e.preventDefault();
    updateSettings(s);
    setSaved(true);
    toast.success("Paramètres enregistrés");
    setTimeout(() => setSaved(false), 2500);
  };
  const testConnection = async () => {
    setTesting(true);
    const ok = await simulateFacebookTest(s.facebookPageId, s.facebookToken);
    setTesting(false);
    if (ok) toast.success("Connexion Facebook réussie ✅");
    else toast.error("Connexion impossible — vérifiez l'ID et le token");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Paramètres" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Informations de la boutique" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Informations générales", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom de la boutique", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: s.storeName, onChange: (e) => setS({
        ...s,
        storeName: e.target.value
      }), className: "adm-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email de contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: s.contactEmail, onChange: (e) => setS({
          ...s,
          contactEmail: e.target.value
        }), className: "adm-input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone (+224)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: s.contactPhone, onChange: (e) => setS({
          ...s,
          contactPhone: e.target.value
        }), className: "adm-input" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp Support", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: s.whatsapp, onChange: (e) => setS({
        ...s,
        whatsapp: e.target.value
      }), className: "adm-input" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Frais de livraison par ville (GNF)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50 text-slate-600 text-xs uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium", children: "Ville" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium", children: "Frais (GNF)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium w-32", children: "Aperçu" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: s.deliveryFees.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: d.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: d.fee, onChange: (e) => setS({
          ...s,
          deliveryFees: s.deliveryFees.map((x, idx) => idx === i ? {
            ...x,
            fee: Number(e.target.value)
          } : x)
        }), className: "adm-input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-slate-500 text-xs", children: formatGNF(d.fee) })
      ] }, d.city)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-[#1877F2] text-white flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Intégration Facebook" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Publiez automatiquement vos produits sur votre page" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ID de la page Facebook", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: s.facebookPageId, onChange: (e) => setS({
        ...s,
        facebookPageId: e.target.value
      }), placeholder: "123456789", className: "adm-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Token d'accès (Page Access Token)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: s.facebookToken, onChange: (e) => setS({
        ...s,
        facebookToken: e.target.value
      }), placeholder: "EAAB...", className: "adm-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: testConnection, disabled: testing, className: "inline-flex items-center gap-2 text-sm border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-3.5 py-2 rounded-lg disabled:opacity-60", children: [
        testing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        "Tester la connexion"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-t border-slate-100 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-900", children: "Publier automatiquement les nouveaux produits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Chaque nouveau produit sera publié sur la page Facebook" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setS({
          ...s,
          facebookAutoPublish: !s.facebookAutoPublish
        }), className: "relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + (s.facebookAutoPublish ? "bg-blue-600" : "bg-slate-300"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + (s.facebookAutoPublish ? "translate-x-6" : "translate-x-1") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
        " Enregistrer les paramètres"
      ] }),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full", children: "Paramètres enregistrés ✓" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.adm-input{width:100%;padding:0.5rem 0.75rem;border:1px solid rgb(203 213 225);border-radius:0.5rem;font-size:0.875rem;background:white;color:rgb(15 23 42)}.adm-input:focus{outline:none;box-shadow:0 0 0 2px rgb(59 130 246);border-color:transparent}` })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: title }),
    children
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: label }),
    children
  ] });
}
export {
  SettingsPage as component
};
