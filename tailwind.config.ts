import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lignum-white': '#FAFAF7',
        'lignum-charcoal': '#1A1A1A',
        'lignum-gold': '#C9A96E',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-source-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
