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
import ClinicalReportsPage from "./features/clinicalReport/pages/MedicalReports";
import PatientsDashboard from "./features/patient/pages/PatientsDashboard";
import DashboardPage from "./features/user/pages/DashboardPage";
import OwnersDashboard from "./features/owner/pages/OwnerDashboard";

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
      {
        path: "patients",
        element: <PatientsDashboard />,
      },
      {
        path: "owners",
        element: <OwnersDashboard />,
      },
      {
        path: "medical-reports",
        element: <ClinicalReportsPage />,
      },
      // Redirigir a profile si no hay ruta específica
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
]);
