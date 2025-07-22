"use client"
import HeaderLayout from "@/components/HeaderLayout";
import { NotificationsListener } from "@/components/NotificationListerner";
import { AppSidebar } from "@/components/sidebar/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SocketProvider } from "@/context/SocketContext";

export default function Layout({ children }) {
  return (
      <SocketProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
          <HeaderLayout/>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <NotificationsListener />
      </SocketProvider>
  );
}
