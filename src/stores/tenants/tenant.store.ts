import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TenantState {
  tenantId: string;
  getTenantId: () => string;
  addTenantId: (id: string) => string;
}

const storeApi: StateCreator<TenantState> = (set, get) => ({
  tenantId: "",

  getTenantId: () => {
    try {
      return get().tenantId;
    } catch (err) {
      throw "Error en store. Contacte al administrador";
    }
  },

  addTenantId: (id: string) => {
    try {
      set((state) => ({
        tenantId: state.tenantId,
      }));
      return id;
    } catch (err) {
      throw "Error en store. Contacte al administrador";
    }
  },
});

export const useTenantStore = create<TenantState>()(
  devtools(persist(storeApi, { name: "tenant-storage" }))
);
