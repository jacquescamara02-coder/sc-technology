import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BatteryCharging, Cable, Camera, Headphones, Printer, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";
import {
  useStorefrontCategories,
  useFeaturedProducts,
  useNewArrivalProducts,
} from "@/lib/storefront";
import { useSyncStatus } from "@/lib/sync-status";

export const Route = createFileRoute("/")({
  component: Index,
});

const instantCategories = [
  { id: "batterie-des-ordinateur-portable-1779197699023", name: "BATTERIE DES ORDINATEUR PORTABLE", count: 63, icon: BatteryCharging },
  { id: "chargeur-des-ordinateurs-portable-1779233613985", name: "CHARGEUR DES ORDINATEURS PORTABLE", count: 0, icon: Cable },
  { id: "imprimente-1779233621491", name: "IMPRIMENTE ET L’ENCRE", count: 10, icon: Printer },
  { id: "camera-surveillance-1779497629573", name: "CAMÉRA SURVEILLANCE", count: 4, icon: Camera },
  { id: "haut-parleur-bluetooth-1779497212901", name: "HAUT-PARLEUR BLUETOOTH", count: 8, icon: Headphones },
  { id: "pochette-des-telephones-1779497729278", name: "TÉLÉPHONE ,TABLETTE ET POCHETTE", count: 0, icon: Smartphone },
  { id: "ordinateur-portable-et-bureautique-1779497804604", name: "ORDINATEUR PORTABLE ET BUREAUTIQUE", count: 0, icon: ShieldCheck },
  { id: "outils-de-reparation-1779498409728", name: "OUTILS DE RÉPARATION", count: 8, icon: Wrench },
  { id: "accessoir-informatique-1780248554186", name: "ACCESSOIR INFORMATIQUE", count: 25, icon: Cable },
];

function InstantCategoryGrid() {
  return instantCategories.map((c) => {
    const Icon = c.icon;
    return (
      <Link
        key={c.id}
        to="/categories/$categoryId"
        params={{ categoryId: c.id }}
        className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 transition hover:-translate-y-0.5 hover:border-primary/40"
      >
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface-elevated text-primary transition group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" strokeWidth={2.25} />
        </div>
        <div className="text-center">
          <div className="line-clamp-1 text-xs font-semibold text-foreground">{c.name}</div>
          <div className="text-[10px] text-muted-foreground">{c.count} produits</div>
        </div>
      </Link>
    );
  });
}

function Index() {
  const navigate = useNavigate();
  const categories = useStorefrontCategories();
  const featured = useFeaturedProducts().slice(0, 6);
  const newArrivals = useNewArrivalProducts().slice(0, 6);
  const initialLoaded = useSyncStatus((s) => s.initialLoaded);

  return (
    <div className="space-y-7 px-4 py-4">
      <HeroCarousel />

      {/* Catégories populaires */}
      <section>
        <SectionHeader
          title="Catégories populaires"
          action={{ label: "Voir tout", onClick: () => navigate({ to: "/categories" }) }}
        />
        <div className="grid grid-cols-3 gap-2.5">
          {!initialLoaded && categories.length === 0 ? <InstantCategoryGrid /> : categories.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                to="/categories/$categoryId"
                params={{ categoryId: c.id }}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 transition hover:border-primary/40 hover:-translate-y-0.5"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface-elevated text-primary transition group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" strokeWidth={2.25} />
                </div>
                <div className="text-center">
                  <div className="line-clamp-1 text-xs font-semibold text-foreground">{c.name}</div>
                  <div className="text-[10px] text-muted-foreground">{c.count} produits</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Produits en vedette */}
      {!initialLoaded && featured.length === 0 ? (
        <section>
          <SectionHeader title="Produits en vedette" />
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-hidden px-4 pb-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-44 shrink-0 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-square animate-pulse bg-surface-elevated" />
                <div className="space-y-2 p-3">
                  <div className="h-2.5 w-12 animate-pulse rounded-full bg-surface-elevated" />
                  <div className="h-3 w-full animate-pulse rounded-full bg-surface-elevated" />
                  <div className="h-3 w-20 animate-pulse rounded-full bg-surface-elevated" />
                  <div className="h-9 animate-pulse rounded-xl bg-surface-elevated" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : featured.length > 0 && (
        <section>
          <SectionHeader
            title="Produits en vedette"
            action={{ label: "Voir tout", onClick: () => navigate({ to: "/vedette" }) }}
          />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} className="w-44 shrink-0 snap-start" />
            ))}
          </div>
        </section>
      )}

      {/* Nouveautés */}
      {newArrivals.length > 0 && (
        <section>
          <SectionHeader
            title="Nouveautés"
            action={{ label: "Voir tout", onClick: () => navigate({ to: "/nouveautes" }) }}
          />
          <div className="grid grid-cols-2 gap-3">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
