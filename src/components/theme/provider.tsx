"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

import { Toaster } from "@/components/ui/sonner";
import { themeType } from "@/utils/types";
import { setThemeCookie } from "@/Server-actions/getTheme";
import { toast } from "sonner";
import { isOffline } from "@/utils/isOffline";
interface ThemeContextType {
  theme: themeType;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({
  children,
  userTheme,
}: {
  children: ReactNode;
  userTheme: themeType;
}) => {
  const doc = useRef<HTMLHtmlElement>(null);
  const [theme, setTheme] = useState<themeType>(userTheme);
  useEffect(() => {
    let toastId: string | number;
    const handleOnline = () => {
      toastId = toast.error("You are Online", {
        id: toastId,
        description: "Connected to server",
      });
      setThemeCookie(theme);
    };

    const handleOffline = () => {
      toastId = toast.error("You are offline", {
        id: toastId,
        description: "Please connect to internet",
      });
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  useEffect(() => {
    if (isOffline()) {
      return;
    }
    setThemeCookie(theme);
    // document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html ref={doc} className={theme}>
        <body className={`bg-background`}>
          <Toaster
            className="bg-card text-card-foreground z-[1000000]"
            theme={theme}
            position="top-right"
          />
          {children}
        </body>
      </html>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
