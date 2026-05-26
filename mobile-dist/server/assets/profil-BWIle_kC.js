import { J as jsxRuntimeExports, S as reactExports } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, K as useTheme, B as themePresets, I as useProfile, G as useNavigate, U as User, P as Package, M as MessageCircle } from "./router-pZ3dyLDZ.js";
import { t as toast } from "./index-BzhLcmdF.js";
import { C as Check } from "./check-BCGJc5o2.js";
import { u as useOrders } from "./orders-store-Bso_GnWt.js";
import { M as MapPin } from "./map-pin-CY5YqRrW.js";
import { C as CreditCard } from "./credit-card-ZgvAdf2V.js";
import { S as Shield } from "./shield-MCFOAkUU.js";
import { S as Settings, L as LogOut } from "./settings-B1gOb023.js";
import { F as Facebook } from "./facebook-Bn86WJ0n.js";
import { C as ChevronRight } from "./chevron-right-WPEBwgTM.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$3);
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode);
function ThemePicker() {
  const themeId = useTheme((s) => s.themeId);
  const setTheme = useTheme((s) => s.setTheme);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Apparence" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-surface-elevated text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-4.5 w-4.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "Couleur du site" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "Choisissez votre palette préférée" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2.5 sm:grid-cols-8", children: themePresets.map((p) => {
        const active = p.id === themeId;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setTheme(p.id),
            title: p.name,
            className: `group relative flex aspect-square items-center justify-center rounded-xl border-2 transition ${active ? "border-foreground scale-105" : "border-transparent hover:border-border"}`,
            style: { backgroundColor: p.swatch },
            "aria-label": `Palette ${p.name}`,
            children: active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5 text-white drop-shadow", strokeWidth: 3 })
          },
          p.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-center text-[11px] text-muted-foreground", children: [
        "Palette active :",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: themePresets.find((p) => p.id === themeId)?.name })
      ] })
    ] })
  ] });
}
function ProfilePage() {
  const profile = useProfile();
  const ordersCount = useOrders((s) => s.orders.length);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = reactExports.useState(null);
  const initials = profile.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const groups = [{
    title: "Compte",
    items: [{
      icon: User,
      label: "Informations personnelles",
      hint: profile.email,
      action: "edit"
    }, {
      icon: MapPin,
      label: "Adresse de livraison",
      hint: profile.address ? `${profile.address}, ${profile.city}` : profile.city,
      action: "address"
    }, {
      icon: Package,
      label: "Mes commandes",
      hint: `${ordersCount} commande(s)`,
      to: "/orders"
    }, {
      icon: CreditCard,
      label: "Moyens de paiement",
      hint: "Orange Money · Carte",
      to: "/checkout"
    }]
  }, {
    title: "Préférences",
    items: [{
      icon: Heart,
      label: "Mes favoris",
      to: "/vedette"
    }, {
      icon: Bell,
      label: "Notifications",
      hint: profile.notifications ? "Activées" : "Désactivées",
      action: "notifications"
    }, {
      icon: Shield,
      label: "Sécurité & confidentialité",
      action: "help"
    }]
  }, {
    title: "Boutique",
    items: [{
      icon: Settings,
      label: "Espace administrateur",
      to: "/admin"
    }, {
      icon: Facebook,
      label: "Page Facebook",
      href: "https://fb.me/8TeLA81zv"
    }, {
      icon: MessageCircle,
      label: "Contacter sur WhatsApp",
      href: "https://wa.me/224610953838"
    }]
  }, {
    title: "Aide",
    items: [{
      icon: CircleQuestionMark,
      label: "Centre d'aide",
      action: "help"
    }]
  }];
  const handleItemClick = (it) => {
    if (it.to) navigate({
      to: it.to
    });
    else if (it.href) window.open(it.href, "_blank");
    else if (it.action === "edit") setOpenModal("edit");
    else if (it.action === "address") setOpenModal("address");
    else if (it.action === "help") setOpenModal("help");
    else if (it.action === "notifications") {
      profile.update({
        notifications: !profile.notifications
      });
      toast.success(profile.notifications ? "Notifications désactivées" : "Notifications activées");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border bg-card p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-2xl font-bold text-primary-foreground shadow-[var(--shadow-glow)]", children: initials || "R" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-lg font-bold text-foreground", children: profile.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: profile.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] font-semibold text-primary", children: "Client SC TECHNOLOGIE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpenModal("edit"), className: "rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-[11px] font-semibold text-foreground hover:bg-accent", children: "Modifier" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemePicker, {}),
    groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: g.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: g.items.map((it, idx) => {
        const Icon = it.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleItemClick(it), className: `flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-accent ${idx > 0 ? "border-t border-border" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-surface-elevated text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4.5 w-4.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: it.label }),
            it.hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-muted-foreground", children: it.hint })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
        ] }, it.label);
      }) })
    ] }, g.title)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      profile.signOut();
      toast.success("Vous êtes déconnecté");
    }, className: "flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 text-sm font-semibold text-destructive transition hover:bg-destructive/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
      " Se déconnecter"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-4 text-center text-[11px] text-muted-foreground", children: "SC TECHNOLOGIE • v1.0.0" }),
    openModal === "edit" && /* @__PURE__ */ jsxRuntimeExports.jsx(EditProfileModal, { onClose: () => setOpenModal(null), initial: {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone
    }, onSave: (d) => {
      profile.update(d);
      toast.success("Profil mis à jour");
      setOpenModal(null);
    } }),
    openModal === "address" && /* @__PURE__ */ jsxRuntimeExports.jsx(EditAddressModal, { onClose: () => setOpenModal(null), initial: {
      address: profile.address,
      district: profile.district,
      city: profile.city
    }, onSave: (d) => {
      profile.update(d);
      toast.success("Adresse enregistrée");
      setOpenModal(null);
    } }),
    openModal === "help" && /* @__PURE__ */ jsxRuntimeExports.jsx(HelpModal, { onClose: () => setOpenModal(null) })
  ] });
}
function Modal({
  children,
  onClose,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-end justify-center px-4 sm:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md rounded-t-3xl bg-card p-5 shadow-2xl sm:rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-base font-bold text-foreground", children: title }),
      children
    ] })
  ] });
}
function EditProfileModal({
  initial,
  onSave,
  onClose
}) {
  const [d, setD] = reactExports.useState(initial);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { title: "Informations personnelles", onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom complet", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.fullName, onChange: (e) => setD({
        ...d,
        fullName: e.target.value
      }), className: "profile-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: d.email, onChange: (e) => setD({
        ...d,
        email: e.target.value
      }), className: "profile-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.phone, onChange: (e) => setD({
        ...d,
        phone: e.target.value
      }), className: "profile-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 rounded-xl border border-border bg-surface-elevated py-2.5 text-sm font-semibold text-foreground", children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSave(d), className: "flex-1 rounded-xl bg-[image:var(--gradient-primary)] py-2.5 text-sm font-bold text-primary-foreground", children: "Enregistrer" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.profile-input{width:100%;padding:0.55rem 0.75rem;border-radius:0.65rem;background:hsl(var(--background));border:1px solid hsl(var(--border));color:hsl(var(--foreground));font-size:0.875rem}` })
  ] });
}
function EditAddressModal({
  initial,
  onSave,
  onClose
}) {
  const [d, setD] = reactExports.useState(initial);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { title: "Adresse de livraison", onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Adresse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.address, onChange: (e) => setD({
        ...d,
        address: e.target.value
      }), placeholder: "Rue, immeuble…", className: "profile-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quartier", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.district, onChange: (e) => setD({
        ...d,
        district: e.target.value
      }), placeholder: "Kaloum, Ratoma…", className: "profile-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ville", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.city, onChange: (e) => setD({
        ...d,
        city: e.target.value
      }), className: "profile-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 rounded-xl border border-border bg-surface-elevated py-2.5 text-sm font-semibold text-foreground", children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSave(d), className: "flex-1 rounded-xl bg-[image:var(--gradient-primary)] py-2.5 text-sm font-bold text-primary-foreground", children: "Enregistrer" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.profile-input{width:100%;padding:0.55rem 0.75rem;border-radius:0.65rem;background:hsl(var(--background));border:1px solid hsl(var(--border));color:hsl(var(--foreground));font-size:0.875rem}` })
  ] });
}
function HelpModal({
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: "Besoin d'aide ?", onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Notre équipe SC TECHNOLOGIE est disponible 7j/7 pour vous accompagner." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+224610953838", className: "flex items-center justify-between rounded-xl border border-border bg-surface-elevated px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Appeler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "610-95-38-38" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://wa.me/224610953838", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-between rounded-xl border border-border bg-surface-elevated px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "WhatsApp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#25D366] font-semibold", children: "Envoyer un message" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:contact@sctechnology.gn", className: "flex items-center justify-between rounded-xl border border-border bg-surface-elevated px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "contact@sctechnology.gn" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "mt-2 w-full rounded-xl border border-border bg-surface-elevated py-2.5 text-sm font-semibold text-foreground", children: "Fermer" })
  ] }) });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-semibold text-muted-foreground", children: label }),
    children
  ] });
}
export {
  ProfilePage as component
};
