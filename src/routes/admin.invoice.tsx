import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2, Printer, Save } from "lucide-react";
import { toast } from "sonner";
import { useAdminData } from "@/lib/admin-store";
import { useOrders, generateOrderId, type Order } from "@/lib/orders-store";
import { formatGNF } from "@/lib/data";
import { openInvoicePrint } from "@/lib/invoice-template";

export const Route = createFileRoute("/admin/invoice")({
  component: ManualInvoicePage,
});

interface LineItem {
  id: string;
  productId?: string;
  name: string;
  qty: number;
  price: number;
}

function ManualInvoicePage() {
  const { products, settings } = useAdminData();
  const addOrder = useOrders((s) => s.addOrder);

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    city: "Conakry",
  });
  const [paymentLabel, setPaymentLabel] = useState("Espèces");
  const [items, setItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), name: "", qty: 1, price: 0 },
  ]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [tva, setTva] = useState(0);

  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0);
  const total = subtotal + deliveryFee + tva;
  

  const productOptions = useMemo(
    () => products.filter((p) => p.active),
    [products],
  );

  const updateItem = (id: string, patch: Partial<LineItem>) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const removeItem = (id: string) =>
    setItems((arr) => (arr.length > 1 ? arr.filter((i) => i.id !== id) : arr));
  const addItem = () =>
    setItems((arr) => [...arr, { id: crypto.randomUUID(), name: "", qty: 1, price: 0 }]);
  const pickProduct = (id: string, productId: string) => {
    const p = products.find((pp) => pp.id === productId);
    if (!p) return;
    updateItem(id, { productId, name: p.name, price: p.price });
  };

  const validate = () => {
    if (!customer.fullName.trim()) return "Le nom du client est requis";
    if (!customer.phone.trim()) return "Le téléphone du client est requis";
    const valid = items.every((i) => i.name.trim() && i.qty > 0 && i.price >= 0);
    if (!valid) return "Chaque ligne doit avoir un produit, une quantité et un prix";
    return null;
  };

  const buildOrder = (): Order => ({
    id: generateOrderId(),
    createdAt: Date.now(),
    status: "received",
    items: items.map((i) => ({
      id: i.productId ?? i.id,
      name: i.name,
      brand: "",
      image: "",
      qty: i.qty,
      price: i.price,
    })),
    subtotal,
    deliveryFee,
    tva,
    total,
    delivery: {
      fullName: customer.fullName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      district: customer.district,
      city: customer.city,
      notes: "Facture manuelle",
    },
    payment: { method: "card", label: paymentLabel, masked: "—" },
  });

  const saveOrder = () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    addOrder(buildOrder());
    toast.success("Facture enregistrée dans les commandes");
  };

  const printInvoice = () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    openInvoicePrint(buildOrder(), {
      contactPhone: settings.contactPhone,
      contactEmail: settings.contactEmail,
      address: settings.address,
    });
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Nouvelle facture</h2>
          <p className="text-sm text-slate-500 mt-0.5">Créez une facture client directement et imprimez-la</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveOrder}
            className="inline-flex items-center gap-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg"
          >
            <Save className="h-4 w-4" /> Enregistrer
          </button>
          <button
            onClick={printInvoice}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            <Printer className="h-4 w-4" /> Imprimer
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold text-slate-900">Client</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Nom complet *" value={customer.fullName} onChange={(v) => setCustomer({ ...customer, fullName: v })} />
          <Input label="Téléphone *" value={customer.phone} onChange={(v) => setCustomer({ ...customer, phone: v })} placeholder="+224 …" />
          <Input label="Email" value={customer.email} onChange={(v) => setCustomer({ ...customer, email: v })} />
          <Input label="Ville" value={customer.city} onChange={(v) => setCustomer({ ...customer, city: v })} />
          <Input label="Adresse" value={customer.address} onChange={(v) => setCustomer({ ...customer, address: v })} />
          <Input label="Quartier" value={customer.district} onChange={(v) => setCustomer({ ...customer, district: v })} />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Articles</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="h-4 w-4" /> Ajouter une ligne
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-2 py-2 text-left font-medium">Produit / Désignation</th>
                <th className="px-2 py-2 text-right font-medium w-24">Qté</th>
                <th className="px-2 py-2 text-right font-medium w-40">Prix unit. (GNF)</th>
                <th className="px-2 py-2 text-right font-medium w-32">Total</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-t border-slate-100 align-top">
                  <td className="px-2 py-2 space-y-1.5">
                    <select
                      value={i.productId ?? ""}
                      onChange={(e) => pickProduct(i.id, e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white"
                    >
                      <option value="">— Sélectionner un produit (ou saisir libre) —</option>
                      {productOptions.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <input
                      value={i.name}
                      onChange={(e) => updateItem(i.id, { name: e.target.value, productId: undefined })}
                      placeholder="Désignation"
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-sm"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number" min={1}
                      value={i.qty}
                      onChange={(e) => updateItem(i.id, { qty: Math.max(1, Number(e.target.value)) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-sm text-right"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number" min={0}
                      value={i.price}
                      onChange={(e) => updateItem(i.id, { price: Math.max(0, Number(e.target.value)) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-sm text-right"
                    />
                  </td>
                  <td className="px-2 py-2 text-right font-semibold whitespace-nowrap">
                    {formatGNF(i.qty * i.price)}
                  </td>
                  <td className="px-2 py-2">
                    <button onClick={() => removeItem(i.id)} className="text-slate-400 hover:text-red-600 p-1.5">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold text-slate-900">Paiement</h3>
          <select
            value={paymentLabel}
            onChange={(e) => setPaymentLabel(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
          >
            <option>Espèces</option>
            <option>Orange Money</option>
            <option>Carte bancaire</option>
            <option>Virement</option>
            <option>À crédit</option>
          </select>
          <div className="text-xs text-slate-500">
            Orange Money marchand : <strong className="text-[#FF6600]">610-95-38-38</strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
          <h3 className="font-semibold text-slate-900 mb-1">Total</h3>
          <Row label="Sous-total" value={`${formatGNF(subtotal)} GNF`} />
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="text-slate-600">Livraison (GNF)</span>
            <input
              type="number"
              min={0}
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Math.max(0, Number(e.target.value) || 0))}
              className="w-32 px-2 py-1 border border-slate-300 rounded text-sm text-right"
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="text-slate-600">TVA (GNF)</span>
            <input
              type="number"
              min={0}
              value={tva}
              onChange={(e) => setTva(Math.max(0, Number(e.target.value) || 0))}
              className="w-32 px-2 py-1 border border-slate-300 rounded text-sm text-right"
            />
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Livraison et TVA sont saisies manuellement par l'admin selon le client.
          </p>
          <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-base font-bold">
            <span>Total TTC</span>
            <span className="text-blue-700">{formatGNF(total)} GNF</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-700 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

