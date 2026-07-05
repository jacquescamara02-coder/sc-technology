import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { TopHeader } from "@/components/TopHeader";
import { BottomNav } from "@/components/BottomNav";
import { SplashScreen } from "@/components/SplashScreen";
import { Footer } from "@/components/Footer";
import { ThemeApplier } from "@/components/ThemeApplier";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useSupabaseSync } from "@/lib/supabase-sync";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const criticalBootCss = `
  html{min-height:100%;background-color:#16213f;color:#f8fafc;color-scheme:dark;}
  body{min-height:100%;margin:0;background-color:#16213f;color:#f8fafc;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
  html.dark,html.dark body{background-color:#16213f;color:#f8fafc;}
  @supports (background: radial-gradient(ellipse at top,#1c3b7a 0%,#16213f 40%,#0b1220 100%)){html.dark,html.dark body{background:#16213f;background-image:radial-gradient(ellipse at top,#1c3b7a 0%,#16213f 40%,#0b1220 100%);}}
  html:not(.dark),html:not(.dark) body{background-color:#f8fafc;color:#0f172b;color-scheme:light;}
  body:empty::before{content:"SC TECHNOLOGIE";display:grid;place-items:center;min-height:100vh;color:#f8fafc;font-weight:800;letter-spacing:.08em;}
  a{color:inherit;text-decoration:none;}img,svg{max-width:100%;}button,input,textarea,select{font:inherit;}header{position:sticky;top:0;z-index:40;}main{max-width:768px;margin-inline:auto;}section{margin-block:1.25rem;}
  #sc-static-boot{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:24px;background:#16213f;background-image:radial-gradient(ellipse at top,#1c3b7a 0%,#16213f 45%,#0b1220 100%);color:#f8fafc;text-align:center;transition:opacity .24s ease,visibility .24s ease;}
  html.sc-app-ready #sc-static-boot{opacity:0;visibility:hidden;pointer-events:none;}
  .sc-static-boot-card{width:min(100%,28rem);}
  .sc-static-boot-logo{width:72px;height:72px;margin:0 auto 16px;border-radius:18px;background:#fff;padding:6px;object-fit:contain;box-shadow:0 14px 40px rgba(0,102,255,.35);}
  .sc-static-boot-title{margin:0 0 8px;font-size:22px;line-height:1.15;font-weight:900;letter-spacing:.02em;}
  .sc-static-boot-text{margin:0 auto 18px;max-width:24rem;color:#cbd5e1;font-size:15px;line-height:1.5;}
  .sc-static-boot-loader{width:38px;height:38px;margin:0 auto 18px;border-radius:999px;border:3px solid rgba(248,250,252,.22);border-top-color:#4da3ff;animation:sc-spin .8s linear infinite;}
  .sc-static-boot-action{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:#0066ff;color:#fff;padding:12px 18px;font-weight:800;box-shadow:0 10px 30px rgba(0,102,255,.35);}
  @keyframes sc-spin{to{transform:rotate(360deg)}}
  @media (prefers-reduced-motion:reduce){#sc-static-boot{transition:none}.sc-static-boot-loader{animation:none}}
  .sc-noscript{max-width:30rem;margin:18vh auto;padding:1.5rem;text-align:center;border:1px solid rgba(148,163,184,.25);border-radius:1rem;background:rgba(15,23,42,.72);box-shadow:0 20px 60px rgba(0,0,0,.35);}
  .sc-noscript a{display:inline-flex;margin-top:1rem;padding:.65rem 1rem;border-radius:999px;background:#0066ff;color:#fff;font-weight:700;}
`;

const bootRecoveryScript = `
(function(){
  var DARK_BG="#16213f", LIGHT_BG="#f8fafc", started=Date.now();
  function applyBase(){
    try{
      var html=document.documentElement;
      var isAdmin=location.pathname.indexOf("/admin")===0;
      html.style.backgroundColor=isAdmin?LIGHT_BG:DARK_BG;
      html.style.color=isAdmin?"#0f172b":"#f8fafc";
      if(!isAdmin && (" "+html.className+" ").indexOf(" dark ")===-1){html.className=(html.className?html.className+" ":"")+"dark";}
    }catch(e){}
  }
  function bootNode(){return document.getElementById("sc-static-boot");}
  function setBootText(title,text,showButton){
    try{
      var node=bootNode(); if(!node) return;
      var h=node.querySelector(".sc-static-boot-title"), p=node.querySelector(".sc-static-boot-text"), l=node.querySelector(".sc-static-boot-loader"), a=node.querySelector(".sc-static-boot-action");
      if(h) h.textContent=title;
      if(p) p.textContent=text;
      if(l) l.style.display=showButton?"none":"block";
      if(a) a.style.display=showButton?"inline-flex":"none";
    }catch(e){}
  }
  function markReady(){
    try{
      var html=document.documentElement;
      if((" "+html.className+" ").indexOf(" sc-app-ready ")===-1){html.className=(html.className?html.className+" ":"")+"sc-app-ready";}
      var node=bootNode();
      if(node){setTimeout(function(){try{node.parentNode&&node.parentNode.removeChild(node);}catch(e){}},320);}
    }catch(e){}
  }
  function appLooksVisible(){
    try{
      var app=document.querySelector("[data-sc-app-ready]");
      if(!app) return false;
      var rect=app.getBoundingClientRect(), style=getComputedStyle(app), text=(app.innerText||app.textContent||"").replace(/\\s+/g," ").trim();
      return rect.height>80 && rect.width>220 && style.display!=="none" && style.visibility!=="hidden" && text.length>30;
    }catch(e){return false;}
  }
  function hasVisibleApp(){
    if(!document.body) return true;
    if(appLooksVisible()) return true;
    var text=(document.body.innerText||document.body.textContent||"").replace(/\\s+/g," ").trim();
    return text.length>30;
  }
  function watchReady(){
    try{
      if(appLooksVisible()){markReady();return;}
      if(Date.now()-started>6500){setBootText("SC TECHNOLOGIE","Le chargement prend trop de temps. Touchez le bouton ci-dessous pour relancer la boutique.",true);return;}
      setTimeout(watchReady,180);
    }catch(e){}
  }
  function recover(){
    setTimeout(function(){
      try{
        if(!document.body || hasVisibleApp()) return;
        document.body.style.margin="0";
        document.body.style.background=DARK_BG;
        document.body.style.color="#f8fafc";
        setBootText("SC TECHNOLOGIE","Le chargement a été sécurisé. Touchez le bouton ci-dessous pour relancer la boutique.",true);
      }catch(e){}
    },120);
  }
  document.addEventListener("click",function(event){
    try{
      var target=event.target&&event.target.closest&&event.target.closest("[data-sc-reload]");
      if(!target) return;
      event.preventDefault();
      location.reload();
    }catch(e){}
  },true);
  applyBase();
  window.addEventListener("error",recover,true);
  window.addEventListener("unhandledrejection",recover,true);
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",function(){applyBase();watchReady();setTimeout(recover,4500);},{once:true});
  }else{
    watchReady();
    setTimeout(recover,4500);
  }
})();
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page introuvable.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0066FF" },
      { title: "SC TECHNOLOGIE - Matériel Informatique en Guinée" },
      { name: "description", content: "SC TECHNOLOGIE — Vente de matériel informatique en Guinée. Laptops, écrans, imprimantes, accessoires. Livraison à Conakry et toute la Guinée." },
      { property: "og:title", content: "SC TECHNOLOGIE - Matériel Informatique en Guinée" },
      { property: "og:description", content: "SC TECHNOLOGIE — Vente de matériel informatique en Guinée. Laptops, écrans, imprimantes, accessoires. Livraison à Conakry et toute la Guinée." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "SC TECHNOLOGIE - Matériel Informatique en Guinée" },
      { name: "twitter:description", content: "SC TECHNOLOGIE — Vente de matériel informatique en Guinée. Laptops, écrans, imprimantes, accessoires. Livraison à Conakry et toute la Guinée." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/V5SryutPQTfdGHpKpug7astYSGZ2/social-images/social-1779190932316-WhatsApp_Image_2026-05-19_at_07.15.54.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/V5SryutPQTfdGHpKpug7astYSGZ2/social-images/social-1779190932316-WhatsApp_Image_2026-05-19_at_07.15.54.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/app-icon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/app-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        {/* Critical fallback: guarantees the page is never pure black/white,
            even before the stylesheet loads or on very old browsers. */}
        <style
          dangerouslySetInnerHTML={{
            __html: criticalBootCss,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: bootRecoveryScript }} />
        <HeadContent />
      </head>
      <body>
        <noscript>
          <div className="sc-noscript">
            <h1>SC TECHNOLOGIE</h1>
            <p>Activez JavaScript ou rechargez la page pour ouvrir correctement la boutique.</p>
            <a href="/">Recharger la boutique</a>
          </div>
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  useSupabaseSync();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (isAdmin) {
      html.classList.remove("dark");
      html.style.backgroundColor = "#f8fafc";
    } else {
      html.classList.add("dark");
      html.style.backgroundColor = "";
    }
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeApplier />
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Outlet />
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
      <ThemeApplier />
      <SplashScreen />
      <AmbientBackground />
      <div data-sc-app-ready="true" className="relative z-10 min-h-screen pb-20">
        <TopHeader />
        <main className="mx-auto max-w-screen-md animate-[fade-in_0.3s_ease-out]">
          <Outlet />
        </main>
        <Footer />
        <BottomNav />
        <FloatingWhatsApp />
      </div>
    </ErrorBoundary>
    </QueryClientProvider>
  );
}
