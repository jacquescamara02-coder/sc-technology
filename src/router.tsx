import { QueryClient } from "@tanstack/react-query";
import { createRouter, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function FallbackError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  if (typeof console !== "undefined") console.error(error);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem", background: "#0b1220", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: "28rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Une erreur est survenue</h1>
        <p style={{ color: "#94a3b8", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
          La page n'a pas pu s'afficher. Réessayez ou retournez à l'accueil.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => { router.invalidate(); reset(); }}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#2563eb", color: "#fff", border: 0, cursor: "pointer", fontWeight: 600 }}
          >
            Réessayer
          </button>
          <a href="/" style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#fff", color: "#0b1220", textDecoration: "none", fontWeight: 600 }}>
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

function FallbackNotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem", background: "#0b1220", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>404 — Page introuvable</h1>
        <a href="/" style={{ color: "#60a5fa" }}>← Retour à l'accueil</a>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: FallbackError,
    defaultNotFoundComponent: FallbackNotFound,
  });

  return router;
};
