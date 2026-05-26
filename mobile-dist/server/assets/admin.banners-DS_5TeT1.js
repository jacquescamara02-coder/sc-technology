import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as toast } from "./index-BzhLcmdF.js";
import { t as createLucideIcon, E as useAdminData } from "./router-pZ3dyLDZ.js";
import { P as Plus } from "./plus-CT5QbIWM.js";
import { C as ChevronDown } from "./chevron-down-Cg6D_Xfd.js";
import { T as Trash2 } from "./trash-2-C0nachgY.js";
import { U as Upload } from "./upload-BQzeo5Td.js";
import { X } from "./x-gfbicER3.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$1);
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
function BannersPage() {
  const settings = useAdminData((s) => s.settings);
  const {
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    moveHeroSlide,
    updateSettings
  } = useAdminData();
  const [draft, setDraft] = reactExports.useState({
    title: "",
    subtitle: "",
    cta: "Découvrir",
    badge: "Offre limitée",
    link: "/vedette",
    hue: 260,
    active: true
  });
  const handleAdd = () => {
    if (!draft.title.trim()) {
      toast.error("Le titre est requis");
      return;
    }
    addHeroSlide(draft);
    setDraft({
      title: "",
      subtitle: "",
      cta: "Découvrir",
      badge: "Offre limitée",
      link: "/vedette",
      hue: 260,
      active: true
    });
    toast.success("Bannière ajoutée");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Bannières d'accueil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Gérez le carrousel affiché en haut de la page d'accueil" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-900", children: "Lecture automatique" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Le carrousel défile toutes les 4,5 secondes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateSettings({
        heroAutoplay: !settings.heroAutoplay
      }), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.heroAutoplay ? "bg-blue-600" : "bg-slate-300"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.heroAutoplay ? "translate-x-6" : "translate-x-1"}` }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Ajouter une bannière" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Titre *", value: draft.title, onChange: (v) => setDraft({
          ...draft,
          title: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Sous-titre", value: draft.subtitle, onChange: (v) => setDraft({
          ...draft,
          subtitle: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Texte du bouton", value: draft.cta, onChange: (v) => setDraft({
          ...draft,
          cta: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Lien (ex: /vedette, /categories/laptops)", value: draft.link ?? "", onChange: (v) => setDraft({
          ...draft,
          link: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Badge (ex: Offre limitée)", value: draft.badge ?? "", onChange: (v) => setDraft({
          ...draft,
          badge: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-medium text-slate-700 mb-1", children: [
            "Teinte de fond (",
            draft.hue,
            "°)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 360, value: draft.hue ?? 260, onChange: (e) => setDraft({
            ...draft,
            hue: Number(e.target.value)
          }), className: "w-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploader, { value: draft.image, onChange: (img) => setDraft({
          ...draft,
          image: img
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleAdd, className: "inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Ajouter"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-slate-700", children: [
        "Bannières existantes (",
        settings.heroSlides.length,
        ")"
      ] }),
      settings.heroSlides.map((s, idx) => {
        const isImg = s.image && (s.image.startsWith("data:") || s.image.startsWith("http"));
        const bg = isImg ? `url(${s.image}) center/cover` : `linear-gradient(135deg, oklch(0.28 0.10 ${s.hue ?? 260}), oklch(0.50 0.22 ${(s.hue ?? 260) + 10}))`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-32 relative", style: {
            background: bg
          }, children: [
            isImg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 p-4 flex flex-col justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold drop-shadow", children: s.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-xs drop-shadow", children: s.subtitle })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Titre", value: s.title, onChange: (v) => updateHeroSlide(s.id, {
              title: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Sous-titre", value: s.subtitle, onChange: (v) => updateHeroSlide(s.id, {
              subtitle: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Texte du bouton", value: s.cta, onChange: (v) => updateHeroSlide(s.id, {
              cta: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Lien", value: s.link ?? "", onChange: (v) => updateHeroSlide(s.id, {
              link: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Badge", value: s.badge ?? "", onChange: (v) => updateHeroSlide(s.id, {
              badge: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploader, { value: s.image, onChange: (img) => updateHeroSlide(s.id, {
              image: img
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-medium text-slate-700 mb-1", children: [
                "Teinte (",
                s.hue ?? 260,
                "°)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 360, value: s.hue ?? 260, onChange: (e) => updateHeroSlide(s.id, {
                hue: Number(e.target.value)
              }), className: "w-full" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-t border-slate-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: s.active, onChange: (e) => updateHeroSlide(s.id, {
                active: e.target.checked
              }) }),
              "Active"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => moveHeroSlide(s.id, "up"), disabled: idx === 0, className: "h-8 w-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => moveHeroSlide(s.id, "down"), disabled: idx === settings.heroSlides.length - 1, className: "h-8 w-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                if (confirm(`Supprimer "${s.title}" ?`)) deleteHeroSlide(s.id);
              }, className: "h-8 w-8 flex items-center justify-center rounded text-red-600 hover:bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] }, s.id);
      }),
      settings.heroSlides.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl p-8 text-center text-sm text-slate-500", children: "Aucune bannière. Créez la première ci-dessus." })
    ] })
  ] });
}
function Input({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-slate-700 mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })
  ] });
}
function ImageUploader({
  value,
  onChange
}) {
  const ref = reactExports.useRef(null);
  const isImg = value && (value.startsWith("data:") || value.startsWith("http"));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-slate-700 mb-1", children: "Image de fond (optionnelle)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => ref.current?.click(), className: "inline-flex items-center gap-1.5 text-xs border border-slate-300 hover:bg-slate-50 px-3 py-2 rounded-lg", children: [
        isImg ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
        isImg ? "Changer" : "Téléverser"
      ] }),
      isImg && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onChange(void 0), className: "inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
        " Retirer"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => onChange(r.result);
        r.readAsDataURL(f);
      } })
    ] })
  ] });
}
export {
  BannersPage as component
};
