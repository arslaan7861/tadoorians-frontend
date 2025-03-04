import DesktopSidebar from "@/components/RootComponents/DesktopSidebar";
import MobileSidebar from "@/components/RootComponents/MobileSidebar";
import { ReactNode } from "react";

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="flex flex-grow flex-1 overflow-hidden flex-col md:flex-row bg-">
        <DesktopSidebar />
        <main className="relative w-full min-h-full flex-grow overflow-y-auto overflow-x-hidden scrollbar-none">
          {children}
        </main>
      </section>
      <MobileSidebar />
    </>
  );
}

export default AdminLayout;
