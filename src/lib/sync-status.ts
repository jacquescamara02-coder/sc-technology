import { create } from "zustand";

interface SyncStatusState {
  initialLoaded: boolean;
  markLoaded: () => void;
}

export const useSyncStatus = create<SyncStatusState>((set) => ({
  initialLoaded: false,
  markLoaded: () => set((state) => (state.initialLoaded ? state : { initialLoaded: true })),
}));
