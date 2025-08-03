import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { useAuthInit } from "@/features/auth/hooks/useAuthInit";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ToastContainer } from "react-toastify";

export function PrivateLayout() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  useAuthInit();

  if (isLoading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;

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
