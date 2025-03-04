"use server";
import { cookies } from "next/headers";
import { themeType } from "@/utils/types";

export async function getTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  if (!theme) cookieStore.set("theme", "light");
  console.log({ theme });
  return theme?.value as themeType;
}
export async function saveTheme(theme: string) {
  console.log("saving theme");
  const cookieStore = await cookies();
  cookieStore.set("theme", theme);
  console.log(theme);
}
