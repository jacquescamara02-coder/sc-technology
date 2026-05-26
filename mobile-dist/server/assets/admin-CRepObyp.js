import { S as reactExports, J as jsxRuntimeExports, O as Outlet } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, G as useNavigate, J as useRouterState, D as useAdminAuth, w as logoUrl, P as Package, n as ShoppingBag, d as Link } from "./router-pZ3dyLDZ.js";
import { T as Toaster } from "./index-BzhLcmdF.js";
import { F as Facebook } from "./facebook-Bn86WJ0n.js";
import { S as Settings, L as LogOut } from "./settings-B1gOb023.js";
import { X } from "./x-gfbicER3.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "hod4my"
    }
  ],
  [
    "path",
    {
      d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "w4yl2u"
    }
  ],
  ["path", { d: "M3 5a2 2 0 0 0 2 2h3", key: "f2jnh7" }],
  ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3", key: "k8epm1" }]
];
const FolderTree = createLucideIcon("folder-tree", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16", key: "9kzy35" }],
  ["path", { d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2", key: "1t0f0t" }],
  ["circle", { cx: "13", cy: "7", r: "1", fill: "currentColor", key: "1obus6" }],
  ["rect", { x: "8", y: "2", width: "14", height: "14", rx: "2", key: "1gvhby" }]
];
const Images = createLucideIcon("images", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
const __iconNode = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode);
const NAV = [{
  to: "/admin/dashboard",
  label: "Tableau de bord",
  icon: LayoutDashboard
}, {
  to: "/admin/products",
  label: "Produits",
  icon: Package
}, {
  to: "/admin/categories",
  label: "Catégories",
  icon: FolderTree
}, {
  to: "/admin/banners",
  label: "Bannières",
  icon: Images
}, {
  to: "/admin/orders",
  label: "Commandes",
  icon: ShoppingBag
}, {
  to: "/admin/invoice",
  label: "Nouvelle facture",
  icon: FileText
}, {
  to: "/admin/facebook",
  label: "Facebook",
  icon: Facebook
}, {
  to: "/admin/settings",
  label: "Paramètres",
  icon: Settings
}];
function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const {
    isAuthed,
    email,
    logout
  } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const isLogin = pathname === "/admin/login";
  reactExports.useEffect(() => {
    if (!isAuthed && !isLogin) navigate({
      to: "/admin/login"
    });
  }, [isAuthed, isLogin, navigate]);
  reactExports.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  if (isLogin) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  if (!isAuthed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 text-slate-900 flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-64 flex-col bg-white border-r border-slate-200 sticky top-0 h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-slate-200 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "SC TECHNOLOGIE", className: "h-11 w-11 rounded-xl bg-white border border-slate-200 p-1 object-contain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold leading-tight text-slate-900", children: "SC TECHNOLOGIE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 leading-tight", children: "Administration" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 py-4 space-y-1", children: NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarLink, { ...item, active: pathname.startsWith(item.to) }, item.to)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4 border-t border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        logout();
        navigate({
          to: "/admin/login"
        });
      }, className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        "Déconnexion"
      ] }) })
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden fixed inset-0 z-40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40", onClick: () => setMobileOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-slate-200 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "SC TECHNOLOGIE", className: "h-9 w-9 rounded-lg bg-white border border-slate-200 p-0.5 object-contain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-slate-900", children: [
              "SC TECHNOLOGIE ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "Admin" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen(false), className: "p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5 text-slate-500" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 py-4 space-y-1", children: NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarLink, { ...item, active: pathname.startsWith(item.to) }, item.to)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4 border-t border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          logout();
          navigate({
            to: "/admin/login"
          });
        }, className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          "Déconnexion"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 bg-white border-b border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 md:px-8 h-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "md:hidden p-1.5 rounded-lg hover:bg-slate-100", onClick: () => setMobileOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5 text-slate-700" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-sm md:text-base font-semibold truncate", children: "SC TECHNOLOGIE — Administration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-sm text-slate-600", children: email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            logout();
            navigate({
              to: "/admin/login"
            });
          }, className: "hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
            "Déconnexion"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 px-4 md:px-8 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true, closeButton: true })
  ] });
}
function SidebarLink({
  to,
  label,
  icon: Icon,
  active
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors " + (active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
    label
  ] });
}
export {
  AdminLayout as component
};
