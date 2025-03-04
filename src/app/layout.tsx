// app/layout.tsx
import { ReactNode } from "react";

import "./globals.css";
import Titlebar from "@/components/RootComponents/Titlebar";
import { ThemeProvider } from "@/components/theme/provider";
import StateProvider from "@/State";
import { Analytics } from "@vercel/analytics/react";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <StateProvider>
      <ThemeProvider>
        <div className="flex flex-col h-svh">
          {/* <ToastProvider /> */}
          <Analytics />
          <Titlebar />
          {children}
        </div>
      </ThemeProvider>
    </StateProvider>
  );
}
