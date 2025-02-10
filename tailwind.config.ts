import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        cream: '#FFFDF7',
        walnut: '#5C4033',
        'soft-black': '#1A1A1A',
      },
      fontFamily: {
        mono: ['Fira_Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
