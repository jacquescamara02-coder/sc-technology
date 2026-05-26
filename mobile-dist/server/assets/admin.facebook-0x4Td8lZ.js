import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { E as useAdminData, d as Link } from "./router-pZ3dyLDZ.js";
import { s as simulateFacebookPublish } from "./facebook-Vbgem2Ck.js";
import { F as Facebook } from "./facebook-Bn86WJ0n.js";
import { L as LoaderCircle } from "./loader-circle-Dt9PCMKq.js";
import { R as RefreshCw } from "./refresh-cw-CP3mGFmU.js";
import { C as CircleCheck } from "./circle-check-aDIaPYud.js";
import { C as CircleX } from "./circle-x-DBNgfENA.js";
import { C as Clock } from "./clock-QJ3gwoKO.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BzhLcmdF.js";
function FacebookPage() {
  const posts = useAdminData((s) => s.facebookPosts);
  const products = useAdminData((s) => s.products);
  const [reposting, setReposting] = reactExports.useState(null);
  const recent = posts.slice(0, 20);
  const stats = reactExports.useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const monthPublished = posts.filter((p) => p.status === "success" && new Date(p.date).getTime() >= monthStart).length;
    const last = posts[0]?.date;
    return {
      monthPublished,
      last
    };
  }, [posts]);
  const handleRepost = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setReposting(productId);
    await simulateFacebookPublish(product);
    setReposting(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-6 w-6 text-[#1877F2]" }),
        " Publications Facebook"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Historique des produits publiés" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total publié ce mois", value: stats.monthPublished.toString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Dernière publication", value: stats.last ? new Date(stats.last).toLocaleString("fr-FR") : "—" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50 text-slate-600 text-xs uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 w-14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Produit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left font-medium", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right font-medium", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        recent.map((p) => {
          const isImg = p.productImage.startsWith("data:") || p.productImage.startsWith("http");
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-slate-100 hover:bg-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-md overflow-hidden bg-slate-100", children: isImg ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.productImage, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full", style: {
              background: p.productImage
            } }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium", children: p.productName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-slate-600", children: new Date(p.date).toLocaleString("fr-FR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/products/$productId/facebook-preview", params: {
                productId: p.productId
              }, className: "text-xs text-blue-600 hover:underline", children: "Aperçu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleRepost(p.productId), disabled: reposting === p.productId, className: "inline-flex items-center gap-1 text-xs border border-slate-200 hover:bg-slate-50 px-2 py-1 rounded disabled:opacity-50", children: [
                reposting === p.productId ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
                "Republier"
              ] })
            ] }) })
          ] }, p.id);
        }),
        recent.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-3 py-12 text-center text-sm text-slate-500", children: "Aucune publication pour le moment." }) })
      ] })
    ] }) }) })
  ] });
}
function StatCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-slate-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold mt-1", children: value })
  ] });
}
function StatusBadge({
  status
}) {
  if (status === "success") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
    " Publié"
  ] });
  if (status === "failed") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
    " Échec"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
    " En attente"
  ] });
}
export {
  FacebookPage as component
};
