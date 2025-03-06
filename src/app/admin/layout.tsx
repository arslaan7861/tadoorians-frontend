import DesktopSidebar from "@/components/RootComponents/DesktopSidebar";
import MobileSidebar from "@/components/RootComponents/MobileSidebar";
import TableDataLoader from "@/components/RootComponents/TableDataLoader";
import StateProvider from "@/State";
import { ReactNode } from "react";

function AdminLayout({ children }: { children: ReactNode }) {
  // NewMenu();
  // getEmptyMenu();
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
