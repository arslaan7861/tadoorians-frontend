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
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const doc = useRef<HTMLHtmlElement>(null);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    dispatch(getData());
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log(doc.current);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html ref={doc} className={theme}>
        <body className={`bg-background`}>{children}</body>
      </html>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
