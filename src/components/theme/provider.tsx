"use client";
import { AppDispatch } from "@/State";
import { getData } from "@/State/Tables";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
interface ThemeContextType {
  theme: themeType;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});
type themeType = "light" | "dark" | "system";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const doc = useRef<HTMLHtmlElement>(null);
  const [theme, setTheme] = useState<themeType>("light");
  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") || "light") as themeType;
    setTheme(storedTheme);
    dispatch(getData());
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
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
