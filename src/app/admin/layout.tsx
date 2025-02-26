import DesktopSidebar from "@/components/RootComponents/DesktopSidebar";
import MobileSidebar from "@/components/RootComponents/MobileSidebar";
import { ReactNode } from "react";

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-1 overflow-hidden flex-col md:flex-row">
      <DesktopSidebar />
      <main className="relative w-full overflow-y-auto overflow-x-hidden p-4 scrollbar-none">
        {children}
      </main>
      <MobileSidebar />
    </section>
  );
}

export default AdminLayout;
