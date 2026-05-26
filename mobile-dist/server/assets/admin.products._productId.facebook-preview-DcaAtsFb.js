import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, l as Route, E as useAdminData, d as Link, M as MessageCircle } from "./router-pZ3dyLDZ.js";
import { t as toast } from "./index-BzhLcmdF.js";
import { g as generateFacebookCaption, s as simulateFacebookPublish } from "./facebook-Vbgem2Ck.js";
import { A as ArrowLeft } from "./arrow-left-8opedRDk.js";
import { F as Facebook } from "./facebook-Bn86WJ0n.js";
import { L as LoaderCircle } from "./loader-circle-Dt9PCMKq.js";
import { R as RefreshCw } from "./refresh-cw-CP3mGFmU.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ],
  ["path", { d: "M7 10v12", key: "1qc93n" }]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
function FacebookPreviewPage() {
  const {
    productId
  } = Route.useParams();
  const product = useAdminData((s) => s.products.find((p) => p.id === productId));
  const settings = useAdminData((s) => s.settings);
  const [publishing, setPublishing] = reactExports.useState(false);
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center mx-auto py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600", children: "Produit introuvable." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/products", className: "text-blue-600 hover:underline mt-2 inline-block", children: "← Retour aux produits" })
    ] });
  }
  const caption = generateFacebookCaption(product);
  const alreadyPublished = !!product.facebookPostedAt;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      toast.success("Texte copié dans le presse-papiers");
    } catch {
      toast.error("Impossible de copier");
    }
  };
  const handlePublish = async () => {
    setPublishing(true);
    await simulateFacebookPublish(product);
    setPublishing(false);
  };
  const image = product.images[0] ?? "";
  const isImg = image.startsWith("data:") || image.startsWith("http");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/products", className: "inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Produits"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-6 w-6 text-[#1877F2]" }),
        " Aperçu Facebook"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Voici comment votre produit apparaîtra sur la page Facebook" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold", children: settings.storeName.charAt(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-slate-900 truncate", children: settings.storeName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "À l'instant · 🌍" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 text-sm text-slate-800 whitespace-pre-line", children: caption }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-slate-100", children: isImg ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: product.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full", style: {
        background: image || "#e2e8f0"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-100 px-4 py-2 flex items-center justify-around text-slate-600 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-slate-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "h-4 w-4" }),
          " J'aime"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-slate-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Commenter"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-slate-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
          " Partager"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleCopy, className: "inline-flex items-center gap-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
        " Copier le texte"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePublish, disabled: publishing, className: "inline-flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#1565d8] text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-60", children: publishing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Publication…"
      ] }) : alreadyPublished ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        " Republier"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
        " Publier maintenant"
      ] }) }),
      alreadyPublished && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500 self-center", children: [
        "Dernière publication : ",
        new Date(product.facebookPostedAt).toLocaleString("fr-FR")
      ] })
    ] })
  ] });
}
export {
  FacebookPreviewPage as component
};
