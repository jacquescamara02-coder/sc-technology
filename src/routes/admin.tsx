import {
  createFileRoute,
  Outlet,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  Facebook,
  Images,
  FileText,
  Bell,
} from "lucide-react";
import { Toaster } from "sonner";
import { useAdminAuth, useAdminData } from "@/lib/admin-store";
import { useLowStockAlerts, isLowStock, isOutOfStock } from "@/lib/use-low-stock-alerts";
import logoUrl from "@/assets/sc-logo.png";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/admin/products", label: "Produits", icon: Package },
  { to: "/admin/categories", label: "Catégories", icon: FolderTree },
  { to: "/admin/banners", label: "Bannières", icon: Images },
  { to: "/admin/orders", label: "Commandes", icon: ShoppingBag },
  { to: "/admin/invoice", label: "Nouvelle facture", icon: FileText },
  { to: "/admin/facebook", label: "Facebook", icon: Facebook },
  { to: "/admin/settings", label: "Paramètres", icon: Settings },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isAuthed, email, logout, hydrate, hydrated } = useAdminAuth();
  const products = useAdminData((s) => s.products);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  useLowStockAlerts();

  const lowStockItems = useMemo(
    () => products.filter((p) => isLowStock(p) || isOutOfStock(p)),
    [products],
  );
  const alertCount = lowStockItems.length;

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!hydrated) void hydrate();
  }, [hydrated, hydrate]);

  useEffect(() => {
    if (hydrated && !isAuthed && !isLogin) navigate({ to: "/admin/login" });
  }, [hydrated, isAuthed, isLogin, navigate]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/admin/login" });
  };

  if (isLogin) return <Outlet />;
  if (!hydrated || !isAuthed) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 sticky top-0 h-screen">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-3">
          <img src={logoUrl} alt="SC TECHNOLOGIE" className="h-11 w-11 rounded-xl bg-white border border-slate-200 p-1 object-contain" />
          <div>
            <p className="text-sm font-bold leading-tight text-slate-900">SC TECHNOLOGIE</p>
            <p className="text-xs text-slate-500 leading-tight">Administration</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <SidebarLink key={item.to} {...item} active={pathname.startsWith(item.to)} />
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-200">
          <button
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logoUrl} alt="SC TECHNOLOGIE" className="h-9 w-9 rounded-lg bg-white border border-slate-200 p-0.5 object-contain" />
                <p className="text-sm font-bold text-slate-900">SC TECHNOLOGIE <span className="text-blue-600">Admin</span></p>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {NAV.map((item) => (
                <SidebarLink key={item.to} {...item} active={pathname.startsWith(item.to)} />
              ))}
            </nav>
            <div className="px-3 py-4 border-t border-slate-200">
              <button
                onClick={() => {
                  logout();
                  navigate({ to: "/admin/login" });
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3 px-4 md:px-8 h-14">
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-100"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5 text-slate-700" />
            </button>
            <h1 className="text-sm md:text-base font-semibold truncate">
              SC TECHNOLOGIE — Administration
            </h1>
            <div className="ml-auto flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAlertsOpen((v) => !v)}
                  className="relative p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                  aria-label="Alertes de stock"
                >
                  <Bell className="h-4 w-4" />
                  {alertCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {alertCount > 99 ? "99+" : alertCount}
                    </span>
                  )}
                </button>
                {alertsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setAlertsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <p className="text-sm font-semibold">Alertes de stock</p>
                        <span className="text-xs text-slate-500">{alertCount} alerte{alertCount > 1 ? "s" : ""}</span>
                      </div>
                      {alertCount === 0 ? (
                        <div className="p-6 text-center text-sm text-slate-500">
                          Tout est OK 🎉
                        </div>
                      ) : (
                        <ul className="max-h-80 overflow-auto divide-y divide-slate-100">
                          {lowStockItems.slice(0, 20).map((p) => {
                            const out = p.stock === 0;
                            return (
                              <li key={p.id} className="px-4 py-3 flex items-center gap-3">
                                <div
                                  className="h-9 w-9 rounded-lg flex-shrink-0 bg-slate-100"
                                  style={{ background: p.images[0] }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                                  <p className="text-xs text-slate-500 truncate">{p.brand}</p>
                                </div>
                                <span
                                  className={
                                    "text-[11px] font-semibold px-2 py-0.5 rounded-full border " +
                                    (out
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : "bg-orange-50 text-orange-700 border-orange-200")
                                  }
                                >
                                  {out ? "Rupture" : `${p.stock} restant${p.stock > 1 ? "s" : ""}`}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
                        <Link
                          to="/admin/products"
                          onClick={() => setAlertsOpen(false)}
                          className="text-xs font-medium text-blue-600 hover:underline"
                        >
                          Gérer les produits →
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <span className="hidden sm:inline text-sm text-slate-600">{email}</span>
              <button
                onClick={() => {
                  logout();
                  navigate({ to: "/admin/login" });
                }}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <LogOut className="h-3.5 w-3.5" />
                Déconnexion
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 md:px-8 py-6">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors " +
        (active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
