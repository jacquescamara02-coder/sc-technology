import { J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { d as Link, c as House } from "./router-pZ3dyLDZ.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
function Breadcrumbs({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-label": "breadcrumb", className: "no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto px-1 text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-muted-foreground transition hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3.5 w-3.5" }) }),
    items.map((c, idx) => {
      const isLast = idx === items.length - 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground" }),
        c.to && !isLast ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: c.to, params: c.params, className: "rounded-full px-2 py-1 font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground", children: c.label }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-surface px-2 py-1 font-semibold text-foreground", children: c.label })
      ] }, idx);
    })
  ] });
}
export {
  Breadcrumbs as B
};
