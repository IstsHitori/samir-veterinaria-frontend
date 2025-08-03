import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";

// Auth Pages
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { ConfirmAccountPage } from "@/features/auth/pages/ConfirmAccountPage";

// User Pages
import ProfilePage from "./features/user/pages/ProfilePage";
import { PrivateLayout } from "./layouts/PrivateLayout";
import UserManagementPage from "./features/user/pages/UserManagementPage";
import DashboardPage from "./features/user/pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "confirm/:token",
        element: <ConfirmAccountPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <PrivateLayout />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UserManagementPage />,
      },
      // Redirigir a profile si no hay ruta específica
      {
        path: "*",
        element: <Navigate to="/app/profile" replace />,
      },
    ],
  },
]);
