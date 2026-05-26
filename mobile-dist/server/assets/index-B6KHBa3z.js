import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { E as useAdminData, G as useNavigate, d as Link } from "./router-pZ3dyLDZ.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
import { P as ProductCard } from "./ProductCard-Cjf6UcoN.js";
import { d as useStorefrontCategories, u as useFeaturedProducts, a as useNewArrivalProducts } from "./storefront-Pr0p4otx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./check-BCGJc5o2.js";
function HeroCarousel() {
  const settings = useAdminData((s) => s.settings);
  const navigate = useNavigate();
  const slides = (settings.heroSlides ?? []).filter((s) => s.active);
  const [i, setI] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!settings.heroAutoplay || slides.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [settings.heroAutoplay, slides.length]);
  if (slides.length === 0) return null;
  const safeI = Math.min(i, slides.length - 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex transition-transform duration-700 ease-out",
        style: { transform: `translateX(-${safeI * 100}%)` },
        children: slides.map((s, idx) => {
          const hue = s.hue ?? 260;
          const isImg = s.image && (s.image.startsWith("data:") || s.image.startsWith("http"));
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative flex h-44 flex-col justify-between p-5 bg-cover bg-center",
              style: isImg ? { backgroundImage: `url(${s.image})` } : {
                backgroundImage: `linear-gradient(135deg, oklch(0.28 0.10 ${hue}), oklch(0.50 0.22 ${hue + 10}))`
              },
              children: [
                isImg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" }),
                s.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur", children: s.badge }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold leading-tight text-white drop-shadow", children: s.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90 drop-shadow", children: s.subtitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        const target = s.link && s.link.trim() ? s.link : "/vedette";
                        if (target.startsWith("http")) window.location.assign(target);
                        else navigate({ to: target });
                      },
                      className: "mt-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary transition active:scale-95",
                      children: [
                        s.cta || "Découvrir",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ) }, s.id ?? idx);
        })
      }
    ),
    slides.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5", children: slides.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setI(idx),
        className: `h-1.5 rounded-full transition-all ${safeI === idx ? "w-6 bg-white" : "w-1.5 bg-white/50"}`,
        "aria-label": `Slide ${idx + 1}`
      },
      idx
    )) })
  ] });
}
function SectionHeader({
  title,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between px-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold tracking-tight text-foreground", children: title }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: action.onClick,
        className: "text-xs font-semibold text-primary transition hover:text-primary-glow",
        children: action.label
      }
    )
  ] });
}
function Index() {
  const navigate = useNavigate();
  const categories = useStorefrontCategories();
  const featured = useFeaturedProducts().slice(0, 6);
  const newArrivals = useNewArrivalProducts().slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7 px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Catégories populaires", action: {
        label: "Voir tout",
        onClick: () => navigate({
          to: "/categories"
        })
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2.5", children: categories.map((c) => {
        const Icon = c.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/categories/$categoryId", params: {
          categoryId: c.id
        }, className: "group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 transition hover:border-primary/40 hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-surface-elevated text-primary transition group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6", strokeWidth: 2.25 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-1 text-xs font-semibold text-foreground", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
              c.count,
              " produits"
            ] })
          ] })
        ] }, c.id);
      }) })
    ] }),
    featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Produits en vedette", action: {
        label: "Voir tout",
        onClick: () => navigate({
          to: "/vedette"
        })
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1", children: featured.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, className: "w-44 shrink-0 snap-start" }, p.id)) })
    ] }),
    newArrivals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Nouveautés", action: {
        label: "Voir tout",
        onClick: () => navigate({
          to: "/nouveautes"
        })
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: newArrivals.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  Index as component
};
