import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

interface VeterinaryProps {
  veterinary: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavVeterinary({ veterinary }: VeterinaryProps) {
  useSidebar(); // Only used for isMobile, but not needed anymore

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Veterinario</SidebarGroupLabel>
      <SidebarMenu>
        {veterinary.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
