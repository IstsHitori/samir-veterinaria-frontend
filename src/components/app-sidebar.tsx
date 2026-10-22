import * as React from "react";
import {
  ClipboardList,
  LayoutDashboard,
  PawPrint,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import HeaderSidedar from "./header-sidedar";

type NavigationItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

const navigationByRole: Record<string, NavigationSection[]> = {
  admin: [
    {
      title: "General",
      items: [
        {
          title: "Panel principal",
          url: "/app/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Gestión",
      items: [
        { title: "Usuarios", url: "/app/users", icon: UsersRound },
        {
          title: "Historias clínicas",
          url: "/app/medical-reports",
          icon: ClipboardList,
        },
        { title: "Pacientes", url: "/app/patients", icon: PawPrint },
        { title: "Dueños", url: "/app/owners", icon: UserRound },
      ],
    },
  ],
  veterinario: [
    {
      title: "Atención veterinaria",
      items: [
        {
          title: "Historias clínicas",
          url: "/app/medical-reports",
          icon: ClipboardList,
        },
        { title: "Pacientes", url: "/app/patients", icon: PawPrint },
        { title: "Dueños", url: "/app/owners", icon: UserRound },
      ],
    },
  ],
  auxiliar: [
    {
      title: "Gestión clínica",
      items: [
        { title: "Pacientes", url: "/app/patients", icon: PawPrint },
        { title: "Dueños", url: "/app/owners", icon: UserRound },
      ],
    },
  ],
};

const roleLabels: Record<string, string> = {
  admin: "Administración",
  veterinario: "Veterinario",
  auxiliar: "Auxiliar",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user) return null;

  const sections = navigationByRole[user.role] ?? [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-2 pt-2">
        <HeaderSidedar role={roleLabels[user.role] ?? user.role} />
      </SidebarHeader>
      <SidebarContent className="gap-1 px-3 py-4">
        {sections.map((section) => (
          <SidebarGroup key={section.title} className="px-0 py-2">
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 group-data-[collapsible=icon]:hidden">
              {section.title}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              {section.items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="relative h-11 rounded-xl px-3 text-slate-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700 data-[active=true]:bg-violet-600 data-[active=true]:font-medium data-[active=true]:text-white data-[active=true]:shadow-sm data-[active=true]:shadow-violet-200 data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-1/2 data-[active=true]:before:h-5 data-[active=true]:before:w-1 data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:rounded-r-full data-[active=true]:before:bg-white"
                  >
                    <NavLink
                      to={item.url}
                      end
                      title={item.title}
                    >
                      <item.icon className="size-[18px] shrink-0" aria-hidden="true" />
                      <span className="truncate">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200/80 p-3">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
