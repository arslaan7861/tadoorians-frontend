// app/layout.tsx
import { ReactNode } from "react";

import "./globals.css";
import Titlebar from "@/components/RootComponents/Titlebar";
import { ThemeProvider } from "@/components/theme/provider";
import StateProvider from "@/State";
import ToastProvider from "@/components/toast/toastProvider";
import { Toaster } from "sonner";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <StateProvider>
      <ThemeProvider>
        <div className="flex flex-col h-svh">
          {/* <ToastProvider /> */}
          <Toaster position="top-right" />
          <Titlebar />
          {children}
        </div>
      </ThemeProvider>
    </StateProvider>
  );
}
