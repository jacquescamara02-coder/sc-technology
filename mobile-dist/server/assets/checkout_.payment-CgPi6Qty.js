import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { G as useNavigate, F as useCart, d as Link, p as Smartphone, u as formatGNF } from "./router-pZ3dyLDZ.js";
import { u as useOrders, g as generateOrderId } from "./orders-store-Bso_GnWt.js";
import { C as ChevronLeft, T as Truck } from "./truck-DrsWnxrj.js";
import { C as CreditCard } from "./credit-card-ZgvAdf2V.js";
import { C as ClipboardCheck } from "./clipboard-check-KrVvX7sM.js";
import { C as Check } from "./check-BCGJc5o2.js";
import { C as ChevronDown } from "./chevron-down-Cg6D_Xfd.js";
import { L as Lock } from "./lock-B0pbCNoD.js";
import { L as LoaderCircle } from "./loader-circle-Dt9PCMKq.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const orangeMoneyQr = "/assets/orange-money-qr-6BEEZY3t.jpeg";
const TVA_RATE = 0.18;
const STEPS = [{
  id: 1,
  label: "Livraison",
  icon: Truck,
  status: "done"
}, {
  id: 2,
  label: "Paiement",
  icon: CreditCard,
  status: "active"
}, {
  id: 3,
  label: "Confirmation",
  icon: ClipboardCheck,
  status: "todo"
}];
function PaymentPage() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const clearCart = useCart((s) => s.clear);
  const delivery = useOrders((s) => s.delivery);
  const addOrder = useOrders((s) => s.addOrder);
  const subtotal = items.reduce((a, i) => a + i.qty * i.product.price, 0);
  const tva = Math.round(subtotal * TVA_RATE);
  const total = subtotal + tva;
  const [summaryOpen, setSummaryOpen] = reactExports.useState(false);
  const [method, setMethod] = reactExports.useState("orange_money");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [omPhone, setOmPhone] = reactExports.useState("+224 ");
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [cardExp, setCardExp] = reactExports.useState("");
  const [cardCvv, setCardCvv] = reactExports.useState("");
  const [cardName, setCardName] = reactExports.useState("");
  const [flipped, setFlipped] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const cardBrand = reactExports.useMemo(() => {
    const d = cardNumber.replace(/\D/g, "");
    if (d.startsWith("4")) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(d)) return "mastercard";
    return null;
  }, [cardNumber]);
  if (items.length === 0 || !delivery) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: items.length === 0 ? "Votre panier est vide" : "Informations de livraison manquantes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: items.length === 0 ? "/" : "/checkout", className: "mt-3 inline-flex rounded-full bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]", children: items.length === 0 ? "Continuer mes achats" : "Reprendre la livraison" })
    ] });
  }
  const validate = () => {
    const e = {};
    if (method === "orange_money") {
      const digits = omPhone.replace(/\D/g, "");
      if (!/^224\d{8,9}$/.test(digits)) e.omPhone = "Numéro Orange invalide (+224 6X XX XX XX)";
    } else {
      const num = cardNumber.replace(/\s/g, "");
      if (!/^\d{16}$/.test(num)) e.cardNumber = "Numéro de carte invalide";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExp)) e.cardExp = "Date invalide (MM/AA)";
      if (!/^\d{3,4}$/.test(cardCvv)) e.cardCvv = "CVV invalide";
      if (cardName.trim().length < 3) e.cardName = "Nom requis";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const onPay = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    const order = {
      id: generateOrderId(),
      createdAt: Date.now(),
      status: "received",
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        brand: i.product.brand,
        image: i.product.image,
        qty: i.qty,
        price: i.product.price
      })),
      subtotal,
      tva,
      total,
      delivery,
      payment: method === "orange_money" ? {
        method,
        label: "Orange Money",
        masked: omPhone.trim()
      } : {
        method,
        label: cardBrand === "mastercard" ? "Mastercard" : "Visa",
        masked: `•••• ${cardNumber.replace(/\D/g, "").slice(-4)}`
      }
    };
    addOrder(order);
    clearCart();
    setSubmitting(false);
    navigate({
      to: "/order-success",
      search: {
        id: order.id
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 py-4 pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground", "aria-label": "Retour à la livraison", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold tracking-tight text-foreground", children: "Paiement" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center gap-2", children: STEPS.map((s, i) => {
      const Icon = s.icon;
      const done = s.status === "done";
      const active = s.status === "active";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-1 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-9 w-9 place-items-center rounded-full border-2 ${active ? "border-primary bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : done ? "border-success bg-success/15 text-success" : "border-border bg-card text-muted-foreground"}`, children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-semibold ${active ? "text-primary" : done ? "text-success" : "text-muted-foreground"}`, children: s.label })
        ] }),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }, s.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MethodCard, { selected: method === "orange_money", onClick: () => setMethod("orange_money"), accent: "#FF6600", title: "Orange Money", subtitle: "Paiement mobile sécurisé", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MethodCard, { selected: method === "card", onClick: () => setMethod("card"), accent: "hsl(var(--primary))", title: "Carte bancaire", subtitle: "Visa / Mastercard", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5" }) })
        ] }),
        method === "orange_money" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 rounded-2xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-[#FF6600] text-base font-black text-white", children: "O" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-foreground", children: "Orange Money" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "Scannez le QR code ou envoyez au numéro ci-dessous" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 rounded-2xl border border-[#FF6600]/30 bg-gradient-to-br from-[#FF6600]/10 to-transparent p-3 sm:grid-cols-[auto_1fr] sm:items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto rounded-xl bg-white p-2 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: orangeMoneyQr, alt: "QR Code Orange Money SC TECHNOLOGIE", className: "h-32 w-32 object-contain" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center sm:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Marchand" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-foreground", children: "SC TECHNOLOGIE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Numéro Orange Money" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+224610953838", className: "text-xl font-black tracking-wide text-[#FF6600]", children: "610-95-38-38" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                "Montant à envoyer :",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
                  formatGNF(total),
                  " GNF"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-semibold text-foreground", children: "Votre numéro Orange Money (pour confirmation)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: omPhone, onChange: (e) => setOmPhone(e.target.value), placeholder: "+224 6X XX XX XX", inputMode: "tel", maxLength: 20, className: inputCls(errors.omPhone) }),
            errors.omPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-destructive", children: errors.omPhone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2 text-xs text-muted-foreground", children: ["Scannez le QR ou composez #144# sur votre Orange", "Envoyez le montant au 610-95-38-38", "Confirmez la transaction avec votre code secret", "Votre commande sera validée automatiquement"].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#FF6600] text-[10px] font-bold text-white", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
          ] }, i)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 rounded-2xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto h-48 w-full max-w-sm [perspective:1000px]", onClick: () => setFlipped((f) => !f), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-between rounded-2xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[var(--shadow-glow)] [backface-visibility:hidden]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-10 rounded-md bg-yellow-300/90 shadow-inner" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardBrandLogo, { brand: cardBrand })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg tracking-[0.2em]", children: (cardNumber || "•••• •••• •••• ••••").padEnd(19, " ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between text-[11px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-70", children: "Titulaire" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold uppercase tracking-wider", children: cardName || "VOTRE NOM" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-70", children: "Expire" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: cardExp || "MM/AA" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col rounded-2xl bg-slate-900 p-5 text-primary-foreground shadow-[var(--shadow-glow)] [backface-visibility:hidden] [transform:rotateY(180deg)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 mt-3 h-10 bg-black" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 flex-1 items-center justify-end rounded bg-white/90 px-3 font-mono text-sm tracking-widest text-slate-900", children: cardCvv || "•••" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto self-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardBrandLogo, { brand: cardBrand }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-semibold text-foreground", children: "Numéro de carte" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cardNumber, onChange: (e) => setCardNumber(formatCardNumber(e.target.value)), onFocus: () => setFlipped(false), placeholder: "XXXX XXXX XXXX XXXX", inputMode: "numeric", maxLength: 19, className: inputCls(errors.cardNumber) }),
            errors.cardNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-destructive", children: errors.cardNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-semibold text-foreground", children: "Expiration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cardExp, onChange: (e) => setCardExp(formatExp(e.target.value)), onFocus: () => setFlipped(false), placeholder: "MM/AA", inputMode: "numeric", maxLength: 5, className: inputCls(errors.cardExp) }),
              errors.cardExp && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-destructive", children: errors.cardExp })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-semibold text-foreground", children: "CVV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cardCvv, onChange: (e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4)), onFocus: () => setFlipped(true), onBlur: () => setFlipped(false), placeholder: "•••", inputMode: "numeric", maxLength: 4, className: inputCls(errors.cardCvv) }),
              errors.cardCvv && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-destructive", children: errors.cardCvv })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-semibold text-foreground", children: "Nom du titulaire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cardName, onChange: (e) => setCardName(e.target.value.toUpperCase()), onFocus: () => setFlipped(false), placeholder: "MAMADOU DIALLO", maxLength: 40, className: inputCls(errors.cardName) }),
            errors.cardName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-destructive", children: errors.cardName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card lg:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSummaryOpen((v) => !v), className: "flex w-full items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
              "Récapitulatif (",
              items.length,
              " article",
              items.length > 1 ? "s" : "",
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-primary", children: formatGNF(total) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 text-muted-foreground transition ${summaryOpen ? "rotate-180" : ""}` })
            ] })
          ] }),
          summaryOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryContent, { items, subtotal, tva, total }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-success" }),
          " Paiement 100% sécurisé SSL"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onPay, disabled: submitting, className: "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98] disabled:opacity-70", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Traitement en cours…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Confirmer et payer ",
          formatGNF(total)
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20 space-y-3 rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-muted-foreground", children: "Votre commande" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryContent, { items, subtotal, tva, total })
      ] }) })
    ] })
  ] });
}
function MethodCard({
  selected,
  onClick,
  title,
  subtitle,
  icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: `flex items-center gap-3 rounded-2xl border p-3 text-left transition ${selected ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]" : "border-border bg-card hover:border-primary/40"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl text-white", style: {
      background: accent
    }, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-5 w-5 place-items-center rounded-full border-2 ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`, children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) })
  ] });
}
function CardBrandLogo({
  brand
}) {
  if (brand === "visa") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-white/95 px-2 py-1 text-xs font-black italic text-[#1A1F71]", children: "VISA" });
  if (brand === "mastercard") return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "-mr-2 h-6 w-6 rounded-full bg-[#EB001B]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-6 w-6 rounded-full bg-[#F79E1B] mix-blend-screen" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-white/30 px-1.5 py-0.5 text-[9px] font-bold", children: "VISA" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-white/30 px-1.5 py-0.5 text-[9px] font-bold", children: "MC" })
  ] });
}
function formatCardNumber(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExp(v) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length < 3) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}
function inputCls(error) {
  return `h-11 w-full rounded-xl border bg-surface px-3 text-sm text-foreground outline-none transition focus:ring-2 ${error ? "border-destructive focus:border-destructive focus:ring-destructive/30" : "border-border focus:border-primary focus:ring-primary/30"}`;
}
function SummaryContent({
  items,
  subtotal,
  tva,
  total
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: items.map(({
      product,
      qty
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-12 w-12 shrink-0 rounded-lg", style: {
        backgroundImage: product.image
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground", children: qty }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-1 text-xs font-semibold text-foreground", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: product.brand })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-foreground", children: formatGNF(product.price * qty) })
    ] }, product.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 border-t border-border pt-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Sous-total", value: formatGNF(subtotal) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Livraison", value: "À calculer", muted: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "TVA (18%)", value: formatGNF(tva) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "TOTAL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: formatGNF(total) })
    ] })
  ] });
}
function Row({
  label,
  value,
  muted = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted ? "text-muted-foreground" : "font-medium text-foreground", children: value })
  ] });
}
export {
  PaymentPage as component
};
