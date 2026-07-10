// Mobile / Capacitor build config.
//
// Produces a pure client-side SPA (no SSR streaming, no self.$_TSR hydration
// payload) so the compiled index.html can be loaded as a static file inside
// a WKWebView (iOS) or Android WebView without crashing on
// "Error: Invariant failed" during hydration.
//
// Web deployment keeps using the default `vite.config.ts` (streaming SSR on
// Cloudflare). This config is only used for mobile:
//   npx vite build --config vite.config.mobile.ts
//   npx cap sync
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Skip Nitro entirely — no server bundle needed for Capacitor.
  nitro: false,
  tanstackStart: {
    // Enable SPA mode: TanStack Start emits a static shell HTML and hydrates
    // fully on the client. No streaming, no self.$_TSR chunks.
    spa: {
      enabled: true,
    },
    prerender: { enabled: false },
  },
  vite: {
    // Capacitor loads files from capacitor://localhost — relative asset paths
    // are required so /_build/... doesn't 404 inside the WebView.
    base: "./",
    build: {
      outDir: "mobile-dist/client",
      emptyOutDir: true,
      // The WebView has no HTTP server, so avoid inline-service-worker or
      // manifest features that assume a network origin.
      sourcemap: false,
    },
    define: {
      // Flag consumed at runtime if code needs to branch on mobile vs web.
      "import.meta.env.VITE_MOBILE_BUILD": JSON.stringify("true"),
    },
    optimizeDeps: {
      include: ["@supabase/supabase-js"],
    },
  },
});
