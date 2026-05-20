import { useState, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

const CONTACTS = [
  { label: "Contact principal", number: "620212045", display: "620-21-20-45" },
  { label: "Contact alternatif", number: "610953838", display: "610-95-38-38" },
];

export function FloatingWhatsApp() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const waLink = (n: string) =>
    `https://wa.me/224${n}?text=${encodeURIComponent(
      "Bonjour SC TECHNOLOGIE, j'aimerais avoir des informations.",
    )}`;

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed bottom-24 right-4 z-[70] w-[88vw] max-w-xs origin-bottom-right rounded-2xl border border-white/10 bg-card/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#25D366]">
              SC TECHNOLOGIE
            </div>
            <div className="mt-0.5 text-sm font-bold text-foreground">
              Discuter avec nous
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Si le premier numéro ne répond pas, contactez le second. Nous
              vous répondons rapidement.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2">
          {CONTACTS.map((c, i) => (
            <div
              key={c.number}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface p-2.5"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {c.label} {i === 1 && "• Backup"}
                </div>
                <div className="text-sm font-bold text-foreground">
                  +224 {c.display}
                </div>
              </div>
              <div className="flex gap-1.5">
                <a
                  href={waLink(c.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white shadow-sm transition active:scale-95 hover:bg-[#1ebe57]"
                  aria-label={`WhatsApp ${c.display}`}
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`tel:+224${c.number}`}
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground transition active:scale-95 hover:border-primary/40"
                  aria-label={`Appeler ${c.display}`}
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 right-4 z-[70] flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3 text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition active:scale-95 hover:bg-[#1ebe57]"
        aria-label="Discuter avec nous sur WhatsApp"
      >
        {pulse && !open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-60" />
        )}
        <MessageCircle className="h-5 w-5" />
        <span className="hidden text-xs font-bold sm:inline">
          Discuter avec nous
        </span>
      </button>
    </>
  );
}
