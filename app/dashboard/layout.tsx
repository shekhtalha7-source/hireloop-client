
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import DashboardSidebar from "../components/DashboardSidebar";
import { Toaster } from "@/components/ui/toast";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h2 className="font-semibold">HireLoop Dashboard</h2>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
        <Toaster/>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
 