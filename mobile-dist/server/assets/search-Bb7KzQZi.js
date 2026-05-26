import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { S as Search, d as Link, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { d as useStorefrontCategories, g as useStorefrontProducts } from "./storefront-Pr0p4otx.js";
import { X } from "./x-gfbicER3.js";
import { C as Clock } from "./clock-QJ3gwoKO.js";
import { A as ArrowRight } from "./arrow-right-CMhWi8u5.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const RECENT_KEY = "techshop_recent_searches";
function SearchPage() {
  const [query, setQuery] = reactExports.useState("");
  const [recent, setRecent] = reactExports.useState([]);
  const categories = useStorefrontCategories();
  const products = useStorefrontProducts();
  reactExports.useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {
    }
  }, []);
  const saveRecent = (q) => {
    const v = q.trim();
    if (!v) return;
    const next = [v, ...recent.filter((r) => r.toLowerCase() !== v.toLowerCase())].slice(0, 8);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
    }
  };
  const clearRecent = () => {
    setRecent([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {
    }
  };
  const results = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => `${p.name} ${p.brand} ${p.specs}`.toLowerCase().includes(q));
  }, [query, products]);
  const grouped = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of results) {
      const arr = map.get(p.category) ?? [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return Array.from(map.entries()).flatMap(([catId, items]) => {
      const cat = categories.find((c) => c.id === catId);
      return cat ? [{
        cat,
        items
      }] : [];
    });
  }, [results, categories]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Recherche" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cherchez par nom, marque ou spécifications" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      saveRecent(query);
    }, className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, type: "search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "MacBook, RTX 4070, casque Sony...", className: "h-11 w-full rounded-full border border-border bg-surface pl-9 pr-10 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" }),
      query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setQuery(""), className: "absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-card text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
    ] }),
    !query && recent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Recherches récentes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearRecent, className: "text-[11px] font-semibold text-primary", children: "Effacer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: recent.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setQuery(r), className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-muted-foreground" }),
        " ",
        r
      ] }, r)) })
    ] }),
    query && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
      results.length,
      " résultat",
      results.length > 1 ? "s" : "",
      " pour « ",
      query,
      " »"
    ] }),
    query && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground", children: "Aucun produit trouvé. Essayez un autre terme." }),
    grouped.map(({
      cat,
      items
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground", children: [
          cat.name,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
            "(",
            items.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/categories/$categoryId", params: {
          categoryId: cat.id
        }, className: "inline-flex items-center gap-1 text-[11px] font-semibold text-primary", children: [
          "Voir tout ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card", children: items.slice(0, 5).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$productId", params: {
        productId: p.id
      }, onClick: () => saveRecent(query), className: "flex items-center gap-3 px-3 py-2.5 transition hover:bg-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 shrink-0 rounded-lg bg-cover bg-center", style: {
          backgroundImage: p.image
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-1 text-sm font-semibold text-foreground", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "line-clamp-1 text-[11px] text-muted-foreground", children: [
            p.brand,
            " • ",
            p.specs
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-foreground", children: formatGNF(p.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-semibold ${p.stock > 0 ? "text-success" : "text-destructive"}`, children: p.stock > 0 ? "En stock" : "Rupture" })
        ] })
      ] }) }, p.id)) })
    ] }, cat.id))
  ] });
}
export {
  SearchPage as component
};
