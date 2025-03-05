"use server";
import { cookies } from "next/headers";
import { themeType } from "@/utils/types";

export async function getThemeCookie() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  return (theme?.value as themeType) || null;
}
export async function setThemeCookie(theme: string) {
  console.log("saving theme");
  const cookieStore = await cookies();
  cookieStore.set("theme", theme, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  console.log(theme);
}
