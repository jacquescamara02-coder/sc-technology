import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeStorage } from "./safe-storage";

export interface ThemePreset {
  id: string;
  name: string;
  swatch: string; // hex for swatch UI
  primary: string;
  primaryGlow: string;
  themeColor: string; // <meta name="theme-color">
}

export const themePresets: ThemePreset[] = [
  { id: "blue", name: "Bleu", swatch: "#0066FF", primary: "#0066FF", primaryGlow: "#4DA3FF", themeColor: "#0066FF" },
  { id: "orange", name: "Orange", swatch: "#FF6600", primary: "#FF6600", primaryGlow: "#FFB347", themeColor: "#FF6600" },
  { id: "green", name: "Vert", swatch: "#10B981", primary: "#10B981", primaryGlow: "#6EE7B7", themeColor: "#10B981" },
  { id: "purple", name: "Violet", swatch: "#8B5CF6", primary: "#8B5CF6", primaryGlow: "#C4B5FD", themeColor: "#8B5CF6" },
  { id: "red", name: "Rouge", swatch: "#EF4444", primary: "#EF4444", primaryGlow: "#FCA5A5", themeColor: "#EF4444" },
  { id: "pink", name: "Rose", swatch: "#EC4899", primary: "#EC4899", primaryGlow: "#F9A8D4", themeColor: "#EC4899" },
  { id: "cyan", name: "Cyan", swatch: "#06B6D4", primary: "#06B6D4", primaryGlow: "#67E8F9", themeColor: "#06B6D4" },
  { id: "gold", name: "Or", swatch: "#D4A24C", primary: "#D4A24C", primaryGlow: "#F3D27A", themeColor: "#D4A24C" },
];

interface ThemeState {
  themeId: string;
  setTheme: (id: string) => void;
}

export function getPreset(id: string): ThemePreset {
  return themePresets.find((p) => p.id === id) ?? themePresets[0];
}

export function applyTheme(id: string) {
  if (typeof document === "undefined") return;
  const preset = getPreset(id);
  const root = document.documentElement;
  root.style.setProperty("--primary", preset.primary);
  root.style.setProperty("--primary-glow", preset.primaryGlow);
  root.style.setProperty("--ring", preset.primary);
  root.style.setProperty(
    "--gradient-primary",
    `linear-gradient(135deg, ${preset.primary}, ${preset.primaryGlow})`,
  );
  root.style.setProperty(
    "--shadow-glow",
    `0 8px 32px -8px color-mix(in oklab, ${preset.primary} 55%, transparent)`,
  );
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", preset.themeColor);
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      themeId: "blue",
      setTheme: (id) => {
        applyTheme(id);
        set({ themeId: id });
      },
    }),
    {
      name: "sc-theme",
      storage: createJSONStorage(() => safeStorage()),
      onRehydrateStorage: () => (state) => {
        if (state?.themeId) applyTheme(state.themeId);
      },
    },
  ),
);
