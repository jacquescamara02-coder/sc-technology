import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { E as useAdminData } from "./router-pZ3dyLDZ.js";
import { P as Plus } from "./plus-CT5QbIWM.js";
import { C as Check } from "./check-BCGJc5o2.js";
import { X } from "./x-gfbicER3.js";
import { P as Pencil } from "./pencil-D_Wdsoil.js";
import { T as Trash2 } from "./trash-2-C0nachgY.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CategoriesPage() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory
  } = useAdminData();
  const [newCat, setNewCat] = reactExports.useState("");
  const [editingCat, setEditingCat] = reactExports.useState(null);
  const [editingCatName, setEditingCatName] = reactExports.useState("");
  const [editingSub, setEditingSub] = reactExports.useState(null);
  const [editingSubName, setEditingSubName] = reactExports.useState("");
  const [newSubByCat, setNewSubByCat] = reactExports.useState({});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Catégories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Gérez les catégories et sous-catégories de votre catalogue" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-4 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newCat, onChange: (e) => setNewCat(e.target.value), placeholder: "Nom de la nouvelle catégorie", className: "flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        if (newCat.trim()) {
          addCategory(newCat.trim());
          setNewCat("");
        }
      }, className: "inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Ajouter"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3.5 flex items-center gap-3 border-b border-slate-100", children: editingCat === c.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editingCatName, onChange: (e) => setEditingCatName(e.target.value), className: "flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => {
            updateCategory(c.id, {
              name: editingCatName
            });
            setEditingCat(null);
          }, color: "green", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => setEditingCat(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "flex-1 font-semibold", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500", children: [
            c.subcategories.length,
            " sous-cat."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => {
            setEditingCat(c.id);
            setEditingCatName(c.name);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => {
            if (confirm(`Supprimer la catégorie "${c.name}" ?`)) deleteCategory(c.id);
          }, color: "red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 space-y-2", children: [
          c.subcategories.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm", children: editingSub === `${c.id}/${s.id}` ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editingSubName, onChange: (e) => setEditingSubName(e.target.value), className: "flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => {
              updateSubcategory(c.id, s.id, editingSubName);
              setEditingSub(null);
            }, color: "green", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => setEditingSub(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 pl-3 text-slate-700", children: [
              "— ",
              s.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => {
              setEditingSub(`${c.id}/${s.id}`);
              setEditingSubName(s.name);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { onClick: () => {
              if (confirm(`Supprimer "${s.name}" ?`)) deleteSubcategory(c.id, s.id);
            }, color: "red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] }) }, s.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newSubByCat[c.id] ?? "", onChange: (e) => setNewSubByCat({
              ...newSubByCat,
              [c.id]: e.target.value
            }), placeholder: "Nouvelle sous-catégorie", className: "flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              const v = (newSubByCat[c.id] ?? "").trim();
              if (v) {
                addSubcategory(c.id, v);
                setNewSubByCat({
                  ...newSubByCat,
                  [c.id]: ""
                });
              }
            }, className: "inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " Ajouter"
            ] })
          ] })
        ] })
      ] }, c.id)),
      categories.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl p-8 text-center text-sm text-slate-500", children: "Aucune catégorie. Créez la première ci-dessus." })
    ] })
  ] });
}
function IconBtn({
  children,
  onClick,
  color
}) {
  const c = color === "red" ? "text-red-600 hover:bg-red-50" : color === "green" ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-500 hover:bg-slate-100";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, className: `h-8 w-8 flex items-center justify-center rounded-md ${c}`, children });
}
export {
  CategoriesPage as component
};
