import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const validateToken = useAuthStore((state) => state.validateToken);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return {
    user,
    isLoading,
    login,
    forgotPassword,
    validateToken,
    resetPassword,
    logout,
  };
}
