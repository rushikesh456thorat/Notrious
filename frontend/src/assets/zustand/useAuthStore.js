// store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (user) => set({ authUser: user }),
      logout: () => set({ authUser: null }),
    }),
    {
      name: "Notorious-User", // localStorage key
      partialize: (state) => ({ authUser: state.authUser }), // persist only authUser
    }
  )
);
