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
  cookieStore.set("theme", theme);
  console.log(theme);
}
// "use server";

// import { themeType } from "@/utils/types";
// import { cookies } from "next/headers";

// const THEME_KEY = "theme";

// export const setThemeCookie = async (theme: string) => {
//   (await cookies()).set(THEME_KEY, theme, {
//     path: "/",
//     maxAge: 365 * 24 * 60 * 60,
//   });
// };

// export const getThemeCookie = async (): Promise<themeType | null> => {
//   return ((await cookies()).get(THEME_KEY)?.value as themeType) || null;
// };
