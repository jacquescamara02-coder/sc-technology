import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-store";
import logoUrl from "@/assets/sc-logo.png";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthed, login, signup, hydrate, hydrated } = useAdminAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!hydrated) void hydrate();
  }, [hydrated, hydrate]);

  useEffect(() => {
    if (isAuthed) navigate({ to: "/admin/dashboard" });
  }, [isAuthed, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    try {
      if (mode === "login") {
        const res = await login(email, password);
        if (res.ok) {
          navigate({ to: "/admin/dashboard" });
        } else {
          setError(res.error ?? "Identifiants incorrects.");
        }
      } else {
        const res = await signup(email, password);
        if (res.ok) {
          setInfo(
            "Compte créé. Vérifie ta boîte mail pour confirmer, puis transmets ton email pour que le rôle admin soit attribué.",
          );
          setMode("login");
        } else {
          setError(res.error ?? "Inscription impossible.");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-white shadow-xl shadow-blue-600/10 border border-slate-200 mb-5 p-2">
            <img src={logoUrl} alt="SC TECHNOLOGIE" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            SC TECHNOLOGIE <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">Espace réservé à l'administration</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-8 border border-slate-200"
        >
          <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setInfo("");
              }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
                setInfo("");
              }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Créer le compte
            </button>
          </div>

          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sc-technologie.shop"
              required
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <label className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
          <div className="relative mb-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mt-3">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {busy ? "..." : mode === "login" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>

        <Link to="/" className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-6">
          ← Retour à la boutique
        </Link>
      </div>
    </div>
  );
}
