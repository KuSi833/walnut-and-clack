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
        'cream': {
          50: '#FDFBF7',
          100: '#FAF7F0',
          200: '#F5EDE0',
          300: '#EFE3D0',
          400: '#E8D5BB',
          500: '#E2C7A6',
          600: '#D4B28C',
          700: '#C69E73',
          800: '#B88A5A',
          900: '#A97642',
        },
        'walnut': {
          50: '#F6F2EF',
          100: '#EDE5DF',
          200: '#DBCCBF',
          300: '#C9B29F',
          400: '#B7997F',
          500: '#A57F5F',
          600: '#8E6A4C',
          700: '#775539',
          800: '#5F4026',
          900: '#482B13',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: '#D4B28C',
        hover: '#EFE3D0',
        text: '#482B13',
      },
      fontFamily: {
        mono: ['Fira_Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
