import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E3362E",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        dark: "#292A2E",
        textGray: "#DCDCDC",
      },
      backgroundImage: {},
      fontFamily: {
        rowdies: ["Rowdies", "sans-serif"],
        red_hot_display: ["Red Hat Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
