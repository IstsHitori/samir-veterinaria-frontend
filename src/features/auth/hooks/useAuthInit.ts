import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export function useAuthInit() {
  const loadUser = useAuthStore((state) => state.loadUser);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) loadUser();
  }, [loadUser, user]);
}
