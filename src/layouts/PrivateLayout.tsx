import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { useAuthInit } from "@/features/auth/hooks/useAuthInit";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ToastContainer } from "react-toastify";
import {
  canAccessRoleRoute,
  getRoleHomeRoute,
} from "@/features/auth/utils/app-role-routes";

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

  // Redirigir al login sin conservar la ruta del usuario anterior.
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!canAccessRoleRoute(user.role, location.pathname)) {
    return <Navigate to={getRoleHomeRoute(user.role)} replace />;
  }

  return (
    <SidebarProvider>
      <ToastContainer />
      <AppSidebar />
      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 flex h-14 items-center border-b border-slate-200/70 bg-background/90 px-3 backdrop-blur sm:px-5">
          <SidebarTrigger className="size-9 rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50" />
        </div>
        <div className="min-w-0">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
