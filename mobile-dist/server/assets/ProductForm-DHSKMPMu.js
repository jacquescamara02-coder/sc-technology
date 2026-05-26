import { S as reactExports, J as jsxRuntimeExports } from "./server-DZhSK7L0.js";
import { G as useNavigate, E as useAdminData, v as generateProductId } from "./router-pZ3dyLDZ.js";
import { s as simulateFacebookPublish } from "./facebook-Vbgem2Ck.js";
import { T as Trash2 } from "./trash-2-C0nachgY.js";
import { P as Plus } from "./plus-CT5QbIWM.js";
import { U as Upload } from "./upload-BQzeo5Td.js";
import { X } from "./x-gfbicER3.js";
const emptyProduct = () => ({
  id: generateProductId(),
  name: "",
  brand: "",
  category: "",
  subcategory: "",
  price: 0,
  stock: 0,
  sku: "",
  description: "",
  specs: [{ key: "", value: "" }],
  images: [],
  active: true,
  publishFacebook: false
});
function ProductForm({ initial }) {
  const navigate = useNavigate();
  const { categories, addProduct, updateProduct } = useAdminData();
  const [p, setP] = reactExports.useState(initial ?? emptyProduct());
  const fileRef = reactExports.useRef(null);
  const [dragOver, setDragOver] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (initial) setP(initial);
  }, [initial]);
  const cat = categories.find((c) => c.id === p.category);
  const subs = cat?.subcategories ?? [];
  const set = (key, value) => setP((prev) => ({ ...prev, [key]: value }));
  const addSpecRow = () => set("specs", [...p.specs, { key: "", value: "" }]);
  const removeSpecRow = (i) => set(
    "specs",
    p.specs.filter((_, idx) => idx !== i)
  );
  const updateSpec = (i, field, v) => set(
    "specs",
    p.specs.map((s, idx) => idx === i ? { ...s, [field]: v } : s)
  );
  const handleFiles = (files) => {
    if (!files) return;
    const remaining = 8 - p.images.length;
    const arr = Array.from(files).slice(0, remaining);
    Promise.all(
      arr.map(
        (f) => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(f);
        })
      )
    ).then((urls) => set("images", [...p.images, ...urls]));
  };
  const removeImage = (i) => set(
    "images",
    p.images.filter((_, idx) => idx !== i)
  );
  const onSubmit = (e) => {
    e.preventDefault();
    if (!p.name || !p.category || !p.subcategory) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    const isNew = !initial;
    if (initial) {
      updateProduct(p.id, p);
    } else {
      addProduct(p);
    }
    const auto = useAdminData.getState().settings.facebookAutoPublish;
    if (p.publishFacebook || isNew && auto) {
      void simulateFacebookPublish(p);
    }
    navigate({ to: "/admin/products" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: initial ? "Modifier le produit" : "Nouveau produit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: initial ? p.name : "Ajoutez un produit à votre catalogue" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Informations générales", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom du produit *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: p.name,
          onChange: (e) => set("name", e.target.value),
          required: true,
          className: "input"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Catégorie *", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: p.category,
            onChange: (e) => {
              set("category", e.target.value);
              set("subcategory", "");
            },
            required: true,
            className: "input",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Choisir —" }),
              categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sous-catégorie *", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: p.subcategory,
            onChange: (e) => set("subcategory", e.target.value),
            required: true,
            disabled: !cat,
            className: "input",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Choisir —" }),
              subs.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Marque", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: p.brand,
            onChange: (e) => set("brand", e.target.value),
            className: "input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "SKU / Référence", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: p.sku,
            onChange: (e) => set("sku", e.target.value),
            className: "input"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: p.description,
          onChange: (e) => set("description", e.target.value),
          rows: 4,
          className: "input resize-none"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Caractéristiques techniques", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      p.specs.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: s.key,
            onChange: (e) => updateSpec(i, "key", e.target.value),
            placeholder: "Ex : Processeur",
            className: "input flex-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: s.value,
            onChange: (e) => updateSpec(i, "value", e.target.value),
            placeholder: "Ex : Intel i7-12700H",
            className: "input flex-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => removeSpecRow(i),
            className: "h-10 w-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: addSpecRow,
          className: "inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 mt-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Ajouter une ligne"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Images (jusqu'à 8)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onDragOver: (e) => {
            e.preventDefault();
            setDragOver(true);
          },
          onDragLeave: () => setDragOver(false),
          onDrop: (e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          },
          className: "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors " + (dragOver ? "border-blue-400 bg-blue-50" : "border-slate-300 hover:border-slate-400 bg-slate-50"),
          onClick: () => fileRef.current?.click(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-slate-400 mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 mt-2", children: "Glissez-déposez ou cliquez pour téléverser" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "PNG, JPG jusqu'à 8 images" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "image/*",
                multiple: true,
                className: "hidden",
                onChange: (e) => handleFiles(e.target.files)
              }
            )
          ]
        }
      ),
      p.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 md:grid-cols-8 gap-2 mt-4", children: p.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-lg overflow-hidden border border-slate-200", children: [
        img.startsWith("data:") || img.startsWith("http") ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `Image ${i + 1}`, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full", style: { background: img } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => removeImage(i),
            className: "absolute top-1 right-1 h-6 w-6 rounded-full bg-white/90 text-slate-700 flex items-center justify-center hover:bg-white",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
          }
        )
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Prix et stock", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Prix (GNF)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 0,
            value: p.price,
            onChange: (e) => set("price", Number(e.target.value)),
            className: "input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ancien prix (GNF, optionnel)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 0,
            value: p.oldPrice ?? "",
            onChange: (e) => set("oldPrice", e.target.value ? Number(e.target.value) : void 0),
            className: "input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Stock disponible", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 0,
            value: p.stock,
            onChange: (e) => set("stock", Number(e.target.value)),
            className: "input"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Badge (optionnel)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: p.badge ?? "",
          onChange: (e) => set("badge", e.target.value || void 0),
          className: "input",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Aucun —" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Promo", children: "Promo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Nouveau", children: "Nouveau" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Top", children: "Top" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Visibilité dans l'application", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Produit actif",
          description: "Visible dans la boutique",
          value: p.active,
          onChange: (v) => set("active", v)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Mettre en vedette",
          description: "Affiché dans la section « Produits en vedette »",
          value: !!p.featured,
          onChange: (v) => set("featured", v)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Marquer comme nouveauté",
          description: "Affiché dans la section « Nouveautés »",
          value: !!p.isNew,
          onChange: (v) => set("isNew", v)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Publier sur Facebook",
          description: "Publication automatique à l'enregistrement",
          value: p.publishFacebook,
          onChange: (v) => set("publishFacebook", v)
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg",
          children: "Enregistrer le produit"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/admin/products" }),
          className: "border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg",
          children: "Annuler"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.input{width:100%;padding:0.5rem 0.75rem;border:1px solid rgb(203 213 225);border-radius:0.5rem;font-size:0.875rem;background:white;color:rgb(15 23 42)}.input:focus{outline:none;border-color:transparent;box-shadow:0 0 0 2px rgb(59 130 246)}` })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-slate-900", children: title }),
    children
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: label }),
    children
  ] });
}
function Toggle({
  label,
  description,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-900", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(!value),
        className: "relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + (value ? "bg-blue-600" : "bg-slate-300"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + (value ? "translate-x-6" : "translate-x-1")
          }
        )
      }
    )
  ] });
}
export {
  ProductForm as P
};
