import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { useAuthInit } from "@/features/auth/hooks/useAuthInit";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ToastContainer } from "react-toastify";

export function PrivateLayout() {
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

  // Redirigir al login si no hay usuario autenticado, guardando la ruta actual
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <SidebarProvider>
      <ToastContainer />
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
