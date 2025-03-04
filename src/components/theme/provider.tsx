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
import { saveTheme } from "@/Server-actions/getTheme";
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
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log(doc.current);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html ref={doc} className={theme}>
        <body className={`bg-background`}>
          <Toaster
            className="bg-card text-card-foreground"
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
