"use client";

import { Logout } from "@/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AutContext";
import { EllipsisVertical, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function SidebarFooterUser({}) {
  const { isMobile } = useSidebar();
  const { user } = useAuth();
  const router = useRouter()
  const shortName = user?.name.substring(0, 2).toUpperCase();
  const handleLogout = async()=>{
    await Logout()
    router.push("/login")
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8  bg-primary ">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded text-white bg-primary">
                  {shortName||"US"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name ||"nome"}</span>
                <span className="text-muted-foreground truncate text-xs ">
                  @{user?.username || "nomeusuario"}
                </span>
              </div>
              <EllipsisVertical />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
