import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, E as useAdminData, d as Link, S as Search, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { t as toast } from "./index-BzhLcmdF.js";
import { P as Plus } from "./plus-CT5QbIWM.js";
import { C as CircleCheck } from "./circle-check-aDIaPYud.js";
import { C as CircleX } from "./circle-x-DBNgfENA.js";
import { T as Trash2 } from "./trash-2-C0nachgY.js";
import { F as Facebook } from "./facebook-Bn86WJ0n.js";
import { S as Star } from "./star-BIYLx0AM.js";
import { P as Pencil } from "./pencil-D_Wdsoil.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const PAGE_SIZE = 50;
function ProductsPage() {
  const {
    products,
    categories,
    bulkUpdate,
    bulkDelete,
    deleteProduct,
    updateProduct
  } = useAdminData();
  const [query, setQuery] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("all");
  const [status, setStatus] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [page, setPage] = reactExports.useState(0);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (status === "active" && !p.active) return false;
      if (status === "inactive" && p.active) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [products, query, cat, status]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
  const toggleAll = () => {
    const ids = new Set(selected);
    const allSelected = pageItems.every((p) => ids.has(p.id));
    if (allSelected) pageItems.forEach((p) => ids.delete(p.id));
    else pageItems.forEach((p) => ids.add(p.id));
    setSelected(ids);
  };
  const toggleOne = (id) => {
    const ids = new Set(selected);
    if (ids.has(id)) ids.delete(id);
    else ids.add(id);
    setSelected(ids);
  };
  const catName = (id) => categories.find((c) => c.id === id)?.name ?? id;
  const subName = (catId, subId) => categories.find((c) => c.id === catId)?.subcategories.find((s) => s.id === subId)?.name ?? subId;
  const selectedIds = Array.from(selected);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Produits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mt-0.5", children: [
          filtered.length,
          " produits"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/products/new", className: "inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Ajouter un produit"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => {
          setQuery(e.target.value);
          setPage(0);
        }, placeholder: "Rechercher (nom, marque, SKU)…", className: "w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: cat, onChange: (e) => {
        setCat(e.target.value);
        setPage(0);
      }, className: "text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Toutes catégories" }),
        categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => {
        setStatus(e.target.value);
        setPage(0);
      }, className: "text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tous statuts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Actifs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactifs" })
      ] })
    ] }),
    selectedIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-900", children: [
        selectedIds.length,
        " sélectionné(s)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          bulkUpdate(selectedIds, {
            active: true
          });
          setSelected(/* @__PURE__ */ new Set());
        }, className: "inline-flex items-center gap-1 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1 rounded-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Activer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          bulkUpdate(selectedIds, {
            active: false
          });
          setSelected(/* @__PURE__ */ new Set());
        }, className: "inline-flex items-center gap-1 text-slate-700 hover:bg-slate-100 px-2.5 py-1 rounded-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
          " Désactiver"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          if (confirm(`Supprimer ${selectedIds.length} produit(s) ?`)) {
            bulkDelete(selectedIds);
            setSelected(/* @__PURE__ */ new Set());
          }
        }, className: "inline-flex items-center gap-1 text-red-700 hover:bg-red-100 px-2.5 py-1 rounded-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " Supprimer"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50 text-slate-600 text-xs uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: pageItems.length > 0 && pageItems.every((p) => selected.has(p.id)), onChange: toggleAll }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Produit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Catégorie" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Marque" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right font-medium", children: "Prix" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right font-medium", children: "Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Statut" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 w-12" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          pageItems.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-slate-100 hover:bg-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selected.has(p.id), onChange: () => toggleOne(p.id) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProductThumb, { product: p, onUpload: (url) => updateProduct(p.id, {
                images: [url, ...p.images.filter((i) => !i.startsWith("linear-gradient"))]
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium truncate flex items-center gap-1.5", children: [
                  p.name,
                  p.facebookStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Publié sur Facebook", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-3.5 w-3.5 text-[#1877F2]" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-mono", children: p.sku })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-slate-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: catName(p.category) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400", children: subName(p.category, p.subcategory) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-slate-600", children: p.brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-semibold", children: formatGNF(p.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: p.stock === 0 ? "text-red-600 font-medium" : p.stock < 5 ? "text-orange-600 font-medium" : "text-slate-700", children: p.stock }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: p.active ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full", children: "Actif" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full", children: "Inactif" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateProduct(p.id, {
                featured: !p.featured
              }), className: `inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-amber-50 ${p.featured ? "text-amber-500" : "text-slate-400"}`, title: p.featured ? "Retirer des vedettes" : "Mettre en vedette", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-4 w-4 ${p.featured ? "fill-amber-400" : ""}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateProduct(p.id, {
                isNew: !p.isNew
              }), className: `inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-emerald-50 ${p.isNew ? "text-emerald-600" : "text-slate-400"}`, title: p.isNew ? "Retirer des nouveautés" : "Marquer comme nouveauté", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/products/$productId/facebook-preview", params: {
                productId: p.id
              }, className: "inline-flex items-center justify-center h-8 w-8 rounded-md text-slate-500 hover:text-[#1877F2] hover:bg-blue-50", title: "Aperçu Facebook", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/products/$productId/edit", params: {
                productId: p.id
              }, className: "inline-flex items-center justify-center h-8 w-8 rounded-md text-slate-500 hover:text-blue-600 hover:bg-blue-50", title: "Modifier", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                if (confirm(`Supprimer "${p.name}" ?`)) deleteProduct(p.id);
              }, className: "inline-flex items-center justify-center h-8 w-8 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50", title: "Supprimer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }) })
          ] }, p.id)),
          pageItems.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "px-3 py-12 text-center text-sm text-slate-500", children: "Aucun produit trouvé." }) })
        ] })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-slate-200 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500", children: [
          "Page ",
          safePage + 1,
          " sur ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: safePage === 0, onClick: () => setPage(safePage - 1), className: "px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40", children: "Précédent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: safePage >= totalPages - 1, onClick: () => setPage(safePage + 1), className: "px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40", children: "Suivant" })
        ] })
      ] })
    ] })
  ] });
}
function ProductThumb({
  product,
  onUpload
}) {
  const ref = reactExports.useRef(null);
  const first = product.images[0];
  const isImg = first && (first.startsWith("data:") || first.startsWith("http"));
  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez choisir une image");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onUpload(reader.result);
      toast.success("Image ajoutée");
    };
    reader.readAsDataURL(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-10 w-10 flex-shrink-0", children: [
    isImg ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: first, alt: product.name, className: "h-10 w-10 rounded-md object-cover border border-slate-200" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-md border border-slate-200", style: {
      background: first ?? "#e2e8f0"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
      e.stopPropagation();
      ref.current?.click();
    }, title: isImg ? "Remplacer l'image" : "Ajouter une image", className: "absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-white shadow ring-2 ring-white hover:bg-blue-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-3 w-3" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleFile(e.target.files?.[0]) })
  ] });
}
export {
  ProductsPage as component
};
