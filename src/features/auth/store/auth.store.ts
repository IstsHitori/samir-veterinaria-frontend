import { create } from "zustand";
import { authService } from "../services/auth.service";
import type { Profile } from "../schemas/auth.schema";

interface AuthStore {
  user: Profile | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  login: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
  validateToken: (token: string) => Promise<string>;
  resetPassword: (
    token: string,
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<string>;
  confirmAccount: (token: string) => Promise<string>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,

  setLoading: (isLoading) => set({ isLoading }),
  forgotPassword: async (email) => {
    try {
      const message = await authService.forgotPassword(email);
      return message;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw error;
    }
  },
  validateToken: async (token) => {
    try {
      const message = await authService.validateToken(token);
      return message;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw error;
    }
  },
  resetPassword: async (token, newPassword, confirmNewPassword) => {
    try {
      const message = await authService.resetPassword(
        token,
        newPassword,
        confirmNewPassword
      );
      return message;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw error;
    }
  },
  confirmAccount: async (token) => {
    try {
      const message = await authService.confirmAccount(token);
      return message;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw error;
    }
  },
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
