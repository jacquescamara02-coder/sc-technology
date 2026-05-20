import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAdminData, type AdminProduct } from "@/lib/admin-store";

export const LOW_STOCK_THRESHOLD = 5;

export function isLowStock(p: AdminProduct) {
  return p.active && p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD;
}
export function isOutOfStock(p: AdminProduct) {
  return p.active && p.stock === 0;
}

/**
 * Watches product stock and fires a toast when a product transitions
 * into low-stock (≤ threshold) or out-of-stock. Notifies once per state
 * change per product (persisted in localStorage so reloads don't re-fire).
 */
export function useLowStockAlerts() {
  const products = useAdminData((s) => s.products);
  const initialized = useRef(false);

  useEffect(() => {
    const KEY = "sc-low-stock-notified";
    let notified: Record<string, "low" | "out" | "ok"> = {};
    try {
      notified = JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
      notified = {};
    }

    let changed = false;

    for (const p of products) {
      const state: "low" | "out" | "ok" = isOutOfStock(p)
        ? "out"
        : isLowStock(p)
          ? "low"
          : "ok";
      const prev = notified[p.id];

      if (state !== prev) {
        // Avoid spamming on first mount: only toast if we already had a baseline
        if (initialized.current) {
          if (state === "low") {
            toast.warning(`Stock faible — ${p.name}`, {
              description: `Il ne reste que ${p.stock} pièce${p.stock > 1 ? "s" : ""} en stock. Pensez à réapprovisionner.`,
              duration: 8000,
            });
          } else if (state === "out") {
            toast.error(`Rupture de stock — ${p.name}`, {
              description: "Ce produit n'est plus disponible. Réapprovisionnement requis.",
              duration: 10000,
            });
          }
        }
        notified[p.id] = state;
        changed = true;
      }
    }

    if (changed) {
      try {
        localStorage.setItem(KEY, JSON.stringify(notified));
      } catch {
        /* ignore */
      }
    }

    initialized.current = true;
  }, [products]);
}
