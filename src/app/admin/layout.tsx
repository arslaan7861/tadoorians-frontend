import DesktopSidebar from "@/components/RootComponents/DesktopSidebar";
import MobileSidebar from "@/components/RootComponents/MobileSidebar";
import TableDataLoader from "@/components/RootComponents/TableDataLoader";
import { ValidateAdmin } from "@/Server-actions/adminAuthenticate";
import StateProvider from "@/State";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = await ValidateAdmin();
  if (!isAdmin) redirect("/login");

  return (
    <StateProvider>
      <TableDataLoader />
      <section className="flex flex-grow flex-1 overflow-hidden flex-col md:flex-row bg-">
        <DesktopSidebar />
        <main className="relative w-full min-h-full flex-grow overflow-y-auto overflow-x-hidden md:scrollbar-none">
          {children}
        </main>
      </section>
      <MobileSidebar />
    </StateProvider>
  );
}

export default AdminLayout;
