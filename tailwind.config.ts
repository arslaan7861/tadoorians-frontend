import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bgcolor)",
        secondaryBackground: "var(--secondaryBgcolor)",
        textColor: "var(--textColor)",
        secondaryTextColor: "var(--secondaryTextColor)",
        accentColor: "var(--accentColor)",
        transAccentColor: "var(--transAccentColor)",
        bordercolor: "var(--borderColor)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
