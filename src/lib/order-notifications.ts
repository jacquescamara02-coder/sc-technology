import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeStorage } from "./safe-storage";

interface State {
  unreadIds: string[];
  addUnread: (id: string) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
}

export const useOrderNotifications = create<State>()(
  persist(
    (set) => ({
      unreadIds: [],
      addUnread: (id) =>
        set((s) => (s.unreadIds.includes(id) ? s : { unreadIds: [id, ...s.unreadIds].slice(0, 100) })),
      markAllRead: () => set({ unreadIds: [] }),
      markRead: (id) => set((s) => ({ unreadIds: s.unreadIds.filter((x) => x !== id) })),
    }),
    {
      name: "sc-admin-order-notifications",
      storage: createJSONStorage(() => safeStorage()),
    },
  ),
);

let audioCtx: AudioContext | null = null;
export function playNotificationSound() {
  if (typeof window === "undefined") return;
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    const play = (freq: number, start: number, dur = 0.18) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.25, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur + 0.02);
    };
    play(880, 0);
    play(1320, 0.18);
  } catch {
    /* ignore */
  }
}
