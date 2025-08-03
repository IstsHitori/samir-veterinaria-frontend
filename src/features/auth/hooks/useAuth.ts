import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  return {
    user,
    isLoading,
    login,
  };
}
