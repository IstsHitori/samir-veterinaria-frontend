import { create } from "zustand";
import { authService } from "../services/auth.service";
import type { Profile } from "../schemas/auth.schema";


interface AuthStore {
  user: Profile | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,

  setLoading: (isLoading) => set({ isLoading }),

  loadUser: async () => {
    set({ isLoading: true });
    try {
      const userProfile = await authService.getProfile();
      set({ user: userProfile, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ user: null, isLoading: false });
        localStorage.removeItem("token");
        throw error;
      }
    }
  },

  login: async (token: string) => {
    localStorage.setItem("token", token);
    try {
      const userProfile = await authService.getProfile();
      set({ user: userProfile, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ user: null, isLoading: false });
        localStorage.removeItem("token");
        throw error;
      }
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isLoading: false });
  },
}));
