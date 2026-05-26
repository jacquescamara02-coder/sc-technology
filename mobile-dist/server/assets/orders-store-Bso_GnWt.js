import { r as create, x as persist, s as createJSONStorage } from "./router-pZ3dyLDZ.js";
const useOrders = create()(
  persist(
    (set) => ({
      delivery: null,
      orders: [],
      setDelivery: (d) => set({ delivery: d }),
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      cancelOrder: (id) => set((s) => ({
        orders: s.orders.map(
          (o) => o.id === id ? { ...o, status: "cancelled" } : o
        )
      }))
    }),
    {
      name: "techshop-orders",
      storage: createJSONStorage(
        () => typeof window !== "undefined" ? window.localStorage : void 0
      )
    }
  )
);
function generateOrderId() {
  const num = Math.floor(1e4 + Math.random() * 9e4);
  return `CMD-GN-${num}`;
}
const STATUS_FLOW = [
  "received",
  "preparing",
  "shipped",
  "delivering",
  "delivered"
];
const STATUS_LABEL = {
  received: "Commande reçue",
  preparing: "En préparation",
  shipped: "Expédiée",
  delivering: "En livraison",
  delivered: "Livrée",
  cancelled: "Annulée"
};
function estimatedDelivery(city) {
  if (city === "Conakry") return "24 à 48 heures";
  return "3 à 7 jours ouvrables";
}
function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  } catch {
    return "";
  }
}
export {
  STATUS_FLOW as S,
  STATUS_LABEL as a,
  estimatedDelivery as e,
  formatDate as f,
  generateOrderId as g,
  useOrders as u
};
