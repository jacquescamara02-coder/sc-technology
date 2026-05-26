import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, h as Route, G as useNavigate, E as useAdminData, F as useCart, y as productImages, z as productReviews, q as averageRating, u as formatGNF, o as ShoppingCart, d as Link } from "./router-pZ3dyLDZ.js";
import { f as useStorefrontProduct, c as useRelatedProducts } from "./storefront-Pr0p4otx.js";
import { P as ProductCard } from "./ProductCard-Cjf6UcoN.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CRnYeGnj.js";
import { C as ChevronLeft, T as Truck } from "./truck-DrsWnxrj.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
import { S as Star } from "./star-BIYLx0AM.js";
import { C as Check } from "./check-BCGJc5o2.js";
import { M as Minus } from "./minus-Bc1ChSDm.js";
import { P as Plus } from "./plus-CT5QbIWM.js";
import { C as ChevronDown } from "./chevron-down-Cg6D_Xfd.js";
import { S as Shield } from "./shield-MCFOAkUU.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function ProductDetailPage() {
  const {
    productId
  } = Route.useParams();
  const navigate = useNavigate();
  const product = useStorefrontProduct(productId);
  const adminProduct = useAdminData((s) => s.products.find((p) => p.id === productId));
  const add = useCart((s) => s.add);
  const images = reactExports.useMemo(() => {
    if (!adminProduct) return [];
    const list = adminProduct.images.map((img) => img.startsWith("data:") || img.startsWith("http") ? `url(${img})` : img);
    return list.length > 0 ? list : product ? productImages(product) : [];
  }, [adminProduct, product]);
  const reviews = reactExports.useMemo(() => product ? productReviews(product) : [], [product]);
  const {
    avg,
    count
  } = reactExports.useMemo(() => product ? averageRating(product) : {
    avg: 0,
    count: 0
  }, [product]);
  const related = useRelatedProducts(product ?? {}, 8);
  const [activeImg, setActiveImg] = reactExports.useState(0);
  const [qty, setQty] = reactExports.useState(1);
  const [descOpen, setDescOpen] = reactExports.useState(false);
  const [justAdded, setJustAdded] = reactExports.useState(false);
  const galleryRef = reactExports.useRef(null);
  if (!product || !adminProduct) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 text-center text-sm text-muted-foreground", children: "Produit introuvable." });
  }
  const inStock = product.stock > 0;
  const specs = [{
    label: "Marque",
    value: adminProduct.brand
  }, {
    label: "Référence",
    value: adminProduct.sku || adminProduct.id.toUpperCase()
  }, ...adminProduct.specs.filter((s) => s.key || s.value).map((s) => ({
    label: s.key || "Spécification",
    value: s.value
  })), {
    label: "Marque",
    value: adminProduct.brand || "—"
  }, {
    label: "Disponibilité",
    value: product.stock > 0 ? `${product.stock} en stock` : "Rupture de stock"
  }];
  const description = adminProduct.description?.trim() || "Produit de qualité disponible chez SC TECHNOLOGIE. Livraison sur Conakry et toute la Guinée. Paiement à la livraison disponible.";
  const scrollTo = (i) => {
    setActiveImg(i);
    galleryRef.current?.scrollTo({
      left: galleryRef.current.clientWidth * i,
      behavior: "smooth"
    });
  };
  const handleAdd = () => {
    if (!inStock) return;
    add(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };
  const handleBuyNow = () => {
    if (!inStock) return;
    add(product, qty);
    navigate({
      to: "/checkout"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{
      label: "Catégories",
      to: "/categories"
    }, {
      label: product.category,
      to: `/categories/${product.category}`
    }, {
      label: product.name
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: galleryRef, onScroll: (e) => {
        const w = e.currentTarget.clientWidth;
        setActiveImg(Math.round(e.currentTarget.scrollLeft / w));
      }, className: "flex aspect-square w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: images.map((bg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-square w-full shrink-0 snap-center bg-cover bg-center", style: {
        backgroundImage: bg
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" }) }, i)) }),
      product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${product.badge === "Promo" ? "bg-destructive text-destructive-foreground" : product.badge === "Nouveau" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}`, children: product.badge }),
      images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scrollTo(Math.max(0, activeImg - 1)), className: "absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition active:scale-90", "aria-label": "Image précédente", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scrollTo(Math.min(images.length - 1, activeImg + 1)), className: "absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition active:scale-90", "aria-label": "Image suivante", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5", children: images.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scrollTo(i), "aria-label": `Image ${i + 1}`, className: `h-1.5 rounded-full transition-all ${activeImg === i ? "w-6 bg-primary" : "w-1.5 bg-foreground/40"}` }, i)) })
      ] })
    ] }),
    images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: images.map((bg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scrollTo(i), className: `h-16 w-16 shrink-0 rounded-xl border-2 bg-cover bg-center transition ${activeImg === i ? "border-primary" : "border-border"}`, style: {
      backgroundImage: bg
    }, "aria-label": `Voir image ${i + 1}` }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary", children: product.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: [
            "Réf: ",
            adminProduct.sku || product.id.toUpperCase()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold leading-tight tracking-tight text-foreground", children: product.name }),
        count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-4 w-4 ${s <= Math.round(avg) ? "fill-warning text-warning" : "text-muted-foreground/40"}` }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: avg.toFixed(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "(",
            count,
            " avis)"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-primary", children: formatGNF(product.price) }),
          product.oldPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground line-through", children: formatGNF(product.oldPrice) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex items-center gap-2 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${inStock ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
          " ",
          inStock ? `En stock (${product.stock} disponibles)` : "Rupture de stock"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Quantité" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full border border-border bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground", "aria-label": "Diminuer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-semibold", children: qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.min(Math.max(1, product.stock), q + 1)), className: "grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground", "aria-label": "Augmenter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground", children: "Caractéristiques techniques" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: specs.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-[1fr_1.4fr] gap-3 px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-surface/40" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: row.value })
        ] }, `${row.label}-${i}`)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `whitespace-pre-line text-sm leading-relaxed text-foreground/90 ${descOpen ? "" : "line-clamp-3"}`, children: description }),
          description.length > 180 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDescOpen((v) => !v), className: "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary", children: [
            descOpen ? "Voir moins" : "Voir plus",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-3.5 w-3.5 transition ${descOpen ? "rotate-180" : ""}` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground", children: "Livraison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Toute la Guinée" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground", children: "Produit authentique" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Importation directe" })
          ] })
        ] })
      ] }),
      reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground", children: [
          "Avis clients (",
          reviews.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: reviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: r.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: r.date })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3.5 w-3.5 ${s <= r.rating ? "fill-warning text-warning" : "text-muted-foreground/40"}` }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/90", children: r.comment })
        ] }, r.id)) })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground", children: "Produits similaires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }) }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-[calc(56px+env(safe-area-inset-bottom))] z-30 border-t border-border bg-background/95 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-screen-md gap-2 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBuyNow, disabled: !inStock, className: "flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-transparent text-sm font-bold text-primary transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
        " Acheter maintenant"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAdd, disabled: !inStock, className: "flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none", children: justAdded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
        " Ajouté !"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
        " Ajouter au panier"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", className: "hidden" })
  ] });
}
export {
  ProductDetailPage as component
};
