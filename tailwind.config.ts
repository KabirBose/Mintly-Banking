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
        isabelline: "#EDE6E3",
        peach: "#F7C59F",
        tomato: "#F06449",
        skyblue: "#5BC3EB",
        blackolive: "#36382E",
      },
    },
  },
  plugins: [],
} satisfies Config;
