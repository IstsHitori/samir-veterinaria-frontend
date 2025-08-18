import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";

export function useAuthInit() {
  const loadUser = useAuthStore((state) => state.loadUser);
  const user = useAuthStore((state) => state.user);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        try {
          await loadUser();
        } catch (error) {
          console.error("Error cargando usuario:", error);
        }
      }
      setInitialized(true);
    };

    initAuth();
  }, [loadUser, user]);

  return initialized;
}
