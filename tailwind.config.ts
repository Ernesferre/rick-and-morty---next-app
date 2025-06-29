// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CE8F5A",
        secondary: "#FDD09D",
        accent: "#82C8BD",
        info: "#5BBFCD",
        dark: "#6287A2",
      },
    },
  },
  plugins: [],
};

export default config;
