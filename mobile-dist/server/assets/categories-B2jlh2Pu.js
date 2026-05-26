import { a4 as useMatches, J as jsxRuntimeExports, O as Outlet } from "./server-DZhSK7L0.js";
import { d as Link } from "./router-pZ3dyLDZ.js";
import { d as useStorefrontCategories } from "./storefront-Pr0p4otx.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CategoriesLayout() {
  const matches = useMatches();
  const isRoot = matches[matches.length - 1]?.routeId === "/categories";
  if (!isRoot) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CategoriesIndex, {});
}
function CategoriesIndex() {
  const categories = useStorefrontCategories();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Catégories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Parcourez nos produits par catégorie" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: categories.map((c) => {
      const Icon = c.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/categories/$categoryId", params: {
        categoryId: c.id
      }, className: "group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-surface-elevated text-primary transition group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6", strokeWidth: 2.25 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-2 text-sm font-semibold text-foreground", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
            c.count,
            " produits"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-primary", children: [
          "Explorer ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
        ] })
      ] }, c.id);
    }) })
  ] });
}
export {
  CategoriesLayout as component
};
