// app/theme-toggle.tsx
"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-textColor hover:text-accentColor transition-colors"
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
