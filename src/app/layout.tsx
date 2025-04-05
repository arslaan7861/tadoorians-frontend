// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";
import Titlebar from "@/components/RootComponents/Titlebar";
import { ThemeProvider } from "@/components/theme/provider";
import { Analytics } from "@vercel/analytics/react";
import { getThemeCookie } from "@/Server-actions/getTheme";
import PWA from "@/components/RootComponents/PWA";
// import { register } from "@/Server-actions/adminAuthenticate";
// import { NewMenu } from "@/Server-actions/menuFunctions";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const userTheme = (await getThemeCookie()) || "light";
  // await NewMenu();
  return (
    <ThemeProvider userTheme={userTheme}>
      <PWA />
      <div className="flex flex-col h-svh">
        {/* <ToastProvider /> */}
        <Analytics />
        <Titlebar />
        {children}
      </div>
    </ThemeProvider>
  );
}
