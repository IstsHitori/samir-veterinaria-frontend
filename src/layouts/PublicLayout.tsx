import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { ToastContainer } from "react-toastify";
import { useAuthInit } from "@/features/auth/hooks/useAuthInit";
export function PublicLayout() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  useAuthInit();
  if (isLoading) return <div>Cargando...</div>;

  if (user) return <Navigate to={"/app/profile"} replace />;
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}
