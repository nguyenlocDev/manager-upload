"use client";

import { AppSidebar } from "@/models/home-page/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/manager", {
      replace: true,
    });
  }, [navigate]);
  return (
    <div className="overflow-hidden w-screen h-screen bg-white">
      <SidebarProvider className="w-full h-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col w-full h-full">
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 ">
            <SidebarTrigger className="-ml-1">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <h1 className="text-xl font-semibold">Bảng điều khiển</h1>
          </header>
          <div className="flex w-full overflow-hidden h-full flex-1 flex-col gap-4 p-4">
            <div className="rounded-lg flex flex-col overflow-y-scroll  w-full h-full border border-dashed p-8">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
