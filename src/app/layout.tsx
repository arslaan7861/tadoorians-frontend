// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";
import Titlebar from "@/components/RootComponents/Titlebar";
import { ThemeProvider } from "@/components/theme/provider";
import StateProvider from "@/State";
import { Analytics } from "@vercel/analytics/react";
import { getThemeCookie } from "@/Server-actions/getTheme";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const userTheme = (await getThemeCookie()) || "light";
  return (
    <StateProvider>
      <ThemeProvider userTheme={userTheme}>
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
