import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { t as createLucideIcon, G as useNavigate, D as useAdminAuth, w as logoUrl, d as Link } from "./router-pZ3dyLDZ.js";
import { L as Lock } from "./lock-B0pbCNoD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function AdminLoginPage() {
  const navigate = useNavigate();
  const {
    isAuthed,
    login
  } = useAdminAuth();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isAuthed) navigate({
      to: "/admin/dashboard"
    });
  }, [isAuthed, navigate]);
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate({
        to: "/admin/dashboard"
      });
    } else {
      setError("Identifiants incorrects. Vérifiez l'email et le mot de passe.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-white to-blue-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-white shadow-xl shadow-blue-600/10 border border-slate-200 mb-5 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "SC TECHNOLOGIE", className: "h-full w-full object-contain" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: [
        "SC TECHNOLOGIE ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-1.5", children: "Espace réservé à l'administration" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "bg-white rounded-2xl shadow-xl shadow-slate-200 p-8 border border-slate-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@techshopgn.com", required: true, className: "w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Mot de passe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", required: true, className: "w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors", children: "Se connecter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-6 text-center", children: "Démo : admin@techshopgn.com / Admin2024!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block text-center text-sm text-slate-500 hover:text-slate-700 mt-6", children: "← Retour à la boutique" })
  ] }) });
}
export {
  AdminLoginPage as component
};
