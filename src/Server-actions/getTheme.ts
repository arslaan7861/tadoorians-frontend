"use server";

import { themeType } from "@/utils/types";
import { cookies } from "next/headers";

const THEME_KEY = "theme";

export const setThemeCookie = async (theme: string) => {
  (await cookies()).set(THEME_KEY, theme, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
  });
};

export const getThemeCookie = async (): Promise<themeType | null> => {
  return ((await cookies()).get(THEME_KEY)?.value as themeType) || null;
};
