import * as React from "react";
import { Frame, PersonStanding, LayoutDashboard } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import HeaderSidedar from "./header-sidedar";
import { NavAuxiliar } from "./nav-auxiliar";
import { NavVeterinary } from "./nav-veterinary";

// This is sample data.
const data = {
  admin: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Usuarios",
      url: "/app/users",
      icon: PersonStanding,
    },
  ],
  veterinary: [
    {
      name: "Historias clínicas",
      url: "/app/medical-reports",
      icon: PersonStanding,
    },
    {
      name: "Pacientes",
      url: "/app/patients",
      icon: PersonStanding,
    },
    {
      name: "Dueños",
      url: "/app/owners",
      icon: Frame,
    },
  ],
  auxiliar: [
    {
      name: "Pacientes",
      url: "/app/patients",
      icon: PersonStanding,
    },
    {
      name: "Dueños",
      url: "/app/owners",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  if (!user) return;
  const isAdmin = user.role === "admin";
  const isAuxiliary = user.role === "auxiliar";
  const isVeterinary = user.role === "veterinario";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeaderSidedar />
      </SidebarHeader>
      <SidebarContent>
        {isAdmin && (
          <>
            <NavMain items={data.admin} />
            <NavVeterinary veterinary={data.veterinary} />
            <NavAuxiliar auxiliar={data.auxiliar} />
          </>
        )}
        {isAuxiliary && <NavAuxiliar auxiliar={data.auxiliar} />}
        {isVeterinary && <NavVeterinary veterinary={data.veterinary} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
