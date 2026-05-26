import { a5 as useRouter, J as jsxRuntimeExports, O as Outlet } from "./server-DZhSK7L0.js";
import { e as useStorefrontCategory, g as useStorefrontProducts } from "./storefront-Pr0p4otx.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CRnYeGnj.js";
import { j as Route } from "./router-pZ3dyLDZ.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
function SubCategoriesPage() {
  const {
    categoryId
  } = Route.useParams();
  const location = useLocation();
  const cat = useStorefrontCategory(categoryId);
  const allProducts = useStorefrontProducts();
  if (!cat) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 text-center text-sm text-muted-foreground", children: "Catégorie introuvable." });
  }
  if (location.pathname !== `/categories/${categoryId}`) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  const Icon = cat.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{
      label: "Catégories",
      to: "/categories"
    }, {
      label: cat.name
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6", strokeWidth: 2.25 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold tracking-tight text-foreground", children: cat.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          cat.count,
          " produits dans ",
          cat.subcategories.length,
          " sous-catégories"
        ] })
      ] })
    ] }),
    cat.subcategories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground", children: "Aucune sous-catégorie pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: cat.subcategories.map((sub) => {
      const count = allProducts.filter((p) => p.category === cat.id && p.subcategory === sub.id).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/categories/${cat.id}/${sub.id}`, onClick: (event) => {
        event.preventDefault();
        window.location.assign(new URL(`/categories/${cat.id}/${sub.id}`, window.location.origin).toString());
      }, className: "group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/40 active:scale-[0.99]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: sub.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
          count,
          " produits"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto inline-flex items-center gap-1 text-[11px] font-semibold text-primary", children: [
          "Voir ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
        ] })
      ] }, sub.id);
    }) })
  ] });
}
export {
  SubCategoriesPage as component
};
