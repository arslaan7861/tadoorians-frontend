"use server";
import { cookies } from "next/headers";
import { themeType } from "@/utils/types";

export async function getTheme(): Promise<themeType> {
  "user server";
  const cookieStore = await cookies();
  let theme = cookieStore.get("theme")?.value as themeType;

  if (!theme) {
    theme = "light"; // Default theme
    await saveTheme(theme); // Persist the default theme
  }

  return theme;
}

export async function saveTheme(theme: themeType) {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set("theme", theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}
