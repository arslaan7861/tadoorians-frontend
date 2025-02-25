// app/layout.tsx
import { ReactNode } from "react";

import "./globals.css";
import Titlebar from "@/components/RootComponents/Titlebar";
import MobileSidebar from "@/components/RootComponents/MobileSidebar";
import DesktopSidebar from "@/components/RootComponents/DesktopSidebar";
import { ThemeProvider } from "@/components/theme/provider";
import StateProvider from "@/State";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <StateProvider>
      <ThemeProvider>
        <div className="flex flex-col h-svh">
          <Titlebar />
          <section className="flex flex-1 overflow-hidden flex-col md:flex-row">
            <DesktopSidebar />
            <main className="relative w-full overflow-y-auto overflow-x-hidden p-4 scrollbar-none">
              {children}
            </main>
            <MobileSidebar />
          </section>
        </div>
      </ThemeProvider>
    </StateProvider>
  );
}
