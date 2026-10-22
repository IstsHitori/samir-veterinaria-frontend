import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { ToastContainer } from "react-toastify";
import { useAuthInit } from "@/features/auth/hooks/useAuthInit";

export function PublicLayout() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const initialized = useAuthInit();
  const location = useLocation();

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading || !initialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Cargando...</h2>
          <p>Verificando autenticación</p>
        </div>
      </div>
    );
  }

  // Si el usuario está autenticado, redirigirlo manteniendo la ruta actual
  if (user) {
    // Si estamos en una ruta de autenticación, redirigir a la app principal
    // Si no, usar la ruta actual
    const from = location.state?.from || "/app";
    return <Navigate to={from} replace />;
  }

  // Capturar la ubicación actual para redirigir después del login
  return (
    <main className="min-h-dvh w-full px-4 sm:px-0">
      <ToastContainer />
      <Outlet />
    </main>
  );
}
