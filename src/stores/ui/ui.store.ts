import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UiState {
  sidebarIsHidden: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
}

const storeApi = (set: any) => ({
  sidebarIsHidden: false,

  showSidebar: () => set({ sidebarIsHidden: true }),

  hideSidebar: () => set({ sidebarIsHidden: false }),
});

export const useUiStore = create<UiState>()(
  devtools(
    persist(storeApi, {
      name: "tenant-storage",
    })
  )
);
