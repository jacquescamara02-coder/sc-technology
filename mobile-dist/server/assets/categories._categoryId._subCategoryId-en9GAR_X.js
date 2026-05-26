import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { e as useStorefrontCategory, h as useStorefrontSubcategory, b as useProductsBySub } from "./storefront-Pr0p4otx.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CRnYeGnj.js";
import { P as ProductCard } from "./ProductCard-Cjf6UcoN.js";
import { t as createLucideIcon, k as Route, S as Search, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { X } from "./x-gfbicER3.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./chevron-right-WPEBwgTM.js";
import "./check-BCGJc5o2.js";
const __iconNode$1 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const PAGE_SIZE = 8;
function ProductsListPage() {
  const {
    categoryId,
    subCategoryId
  } = Route.useParams();
  const cat = useStorefrontCategory(categoryId);
  const sub = useStorefrontSubcategory(categoryId, subCategoryId);
  const all = useProductsBySub(categoryId, subCategoryId);
  const brands = reactExports.useMemo(() => Array.from(new Set(all.map((p) => p.brand))).sort(), [all]);
  const priceBounds = reactExports.useMemo(() => {
    if (all.length === 0) return [0, 0];
    const prices = all.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [all]);
  const [query, setQuery] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("popular");
  const [filterOpen, setFilterOpen] = reactExports.useState(false);
  const [sortOpen, setSortOpen] = reactExports.useState(false);
  const [selectedBrands, setSelectedBrands] = reactExports.useState([]);
  const [priceMax, setPriceMax] = reactExports.useState(priceBounds[1]);
  const [inStockOnly, setInStockOnly] = reactExports.useState(false);
  const [visible, setVisible] = reactExports.useState(PAGE_SIZE);
  const filtered = reactExports.useMemo(() => {
    let list = all.filter((p) => {
      if (query && !`${p.name} ${p.brand} ${p.specs}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (priceMax > 0 && p.price > priceMax) return false;
      if (inStockOnly && p.stock <= 0) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "new":
        list = [...list].sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "popular":
        list = [...list].sort((a, b) => b.popularity - a.popularity);
        break;
    }
    return list;
  }, [all, query, selectedBrands, priceMax, inStockOnly, sort]);
  if (!cat || !sub) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 text-center text-sm text-muted-foreground", children: "Sous-catégorie introuvable." });
  }
  const shown = filtered.slice(0, visible);
  const activeFilters = (selectedBrands.length ? 1 : 0) + (priceMax < priceBounds[1] ? 1 : 0) + (inStockOnly ? 1 : 0);
  const sortLabel = {
    "price-asc": "Prix croissant",
    "price-desc": "Prix décroissant",
    "new": "Nouveautés",
    "popular": "Popularité"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{
      label: "Catégories",
      to: "/categories"
    }, {
      label: cat.name,
      to: `/categories/${cat.id}`
    }, {
      label: sub.name
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold tracking-tight text-foreground", children: [
        cat.name,
        " • ",
        sub.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        filtered.length,
        " produit",
        filtered.length > 1 ? "s" : "",
        " disponible",
        filtered.length > 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: query, onChange: (e) => {
        setQuery(e.target.value);
        setVisible(PAGE_SIZE);
      }, placeholder: "Rechercher dans cette catégorie...", className: "h-11 w-full rounded-full border border-border bg-surface pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilterOpen(true), className: "relative inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card text-xs font-semibold text-foreground transition active:scale-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
        " Filtrer",
        activeFilters > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground", children: activeFilters })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSortOpen(true), className: "inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card text-xs font-semibold text-foreground transition active:scale-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-4 w-4" }),
        " ",
        sortLabel[sort]
      ] })
    ] }),
    shown.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground", children: "Aucun produit ne correspond à vos critères." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", children: shown.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-1 px-1 text-[10px] text-muted-foreground", children: p.specs })
    ] }, p.id)) }),
    visible < filtered.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setVisible((v) => v + PAGE_SIZE), className: "mx-auto block rounded-full border border-primary/40 bg-card px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10 active:scale-95", children: [
      "Charger plus (",
      filtered.length - visible,
      " restants)"
    ] }),
    filterOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomSheet, { onClose: () => setFilterOpen(false), title: "Filtres", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Marques" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: brands.map((b) => {
          const active = selectedBrands.includes(b);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedBrands((cur) => active ? cur.filter((x) => x !== b) : [...cur, b]), className: `rounded-full border px-3 py-1.5 text-xs font-semibold transition ${active ? "border-primary bg-[image:var(--gradient-primary)] text-primary-foreground" : "border-border bg-surface text-muted-foreground"}`, children: b }, b);
        }) })
      ] }),
      priceBounds[1] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Prix maximum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: formatGNF(priceMax) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: priceBounds[0], max: priceBounds[1], step: 5e4, value: priceMax, onChange: (e) => setPriceMax(Number(e.target.value)), className: "w-full accent-[color:var(--primary)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatGNF(priceBounds[0]) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatGNF(priceBounds[1]) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "En stock uniquement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: inStockOnly, onChange: (e) => setInStockOnly(e.target.checked), className: "h-5 w-5 accent-[color:var(--primary)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setSelectedBrands([]);
          setPriceMax(priceBounds[1]);
          setInStockOnly(false);
        }, className: "flex-1 rounded-full border border-border bg-card py-3 text-sm font-semibold text-foreground", children: "Réinitialiser" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setFilterOpen(false);
          setVisible(PAGE_SIZE);
        }, className: "flex-1 rounded-full bg-[image:var(--gradient-primary)] py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]", children: "Appliquer" })
      ] })
    ] }) }),
    sortOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomSheet, { onClose: () => setSortOpen(false), title: "Trier par", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: Object.keys(sortLabel).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      setSort(k);
      setSortOpen(false);
    }, className: `flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition ${sort === k ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-foreground"}`, children: [
      sortLabel[k],
      sort === k && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "✓" })
    ] }, k)) }) })
  ] });
}
function BottomSheet({
  children,
  onClose,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-end justify-center", role: "dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-screen-md rounded-t-3xl border-t border-border bg-background p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl animate-[slide-up_0.3s_ease-out]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "grid h-8 w-8 place-items-center rounded-full bg-surface text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children })
    ] })
  ] });
}
export {
  ProductsListPage as component
};
