export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="fr" class="dark">
  <head>
    <meta charset="utf-8" />
    <title>SC TECHNOLOGIE - Rechargement</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html { background: #16213f; color: #f8fafc; color-scheme: dark; }
      body { font: 15px/1.5 system-ui, -apple-system, Segoe UI, sans-serif; background: #16213f; background-image: radial-gradient(ellipse at top, #1c3b7a 0%, #16213f 45%, #0b1220 100%); color: #f8fafc; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      .logo { width: 72px; height: 72px; border-radius: 18px; background: white; padding: 6px; object-fit: contain; box-shadow: 0 14px 40px rgba(0,102,255,.35); margin: 0 auto 1rem; }
      h1 { font-size: 1.35rem; margin: 0 0 0.5rem; font-weight: 900; }
      p { color: #cbd5e1; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1rem; border-radius: 999px; font: inherit; font-weight: 800; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #0066ff; color: #fff; box-shadow: 0 10px 30px rgba(0,102,255,.35); }
      .secondary { background: rgba(255,255,255,.08); color: #f8fafc; border-color: rgba(148,163,184,.35); }
    </style>
  </head>
  <body>
    <div class="card">
      <img class="logo" src="/app-icon.png" alt="SC TECHNOLOGIE" width="72" height="72" />
      <h1>SC TECHNOLOGIE</h1>
      <p>La boutique n'a pas pu s'afficher correctement. Rechargez la page pour relancer le chargement.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Recharger la boutique</button>
        <a class="secondary" href="/">Accueil</a>
      </div>
    </div>
  </body>
</html>`;
}
