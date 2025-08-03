import * as React from "react";
import {
  Frame,
  Map,
  PieChart,
  PersonStanding,
  LayoutDashboard,
} from "lucide-react";
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
  auxiliar: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  if (!user) return;
  const isAdmin = user.role === "admin";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeaderSidedar />
      </SidebarHeader>
      <SidebarContent>
        {isAdmin && <NavMain items={data.admin} />}
        <NavAuxiliar auxiliar={data.auxiliar} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
