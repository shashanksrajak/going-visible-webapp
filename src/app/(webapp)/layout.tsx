import type { Metadata } from "next";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/navigation/app-sidebar";
import TopHeader from "./_components/navigation/top-header";

export const metadata: Metadata = {
  title: "Home | Going Visible",
  description: "Pain management and wellness for the modern world.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <TopHeader />

            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
