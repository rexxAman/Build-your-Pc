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
        cream: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
          dark: '#F0EBE3',
          deep: '#E8E0D4',
        },
        olive: {
          DEFAULT: '#2D3B2D',
          light: '#6B7B6B',
          muted: '#9CA89C',
          faint: '#B8C4B8',
        },
        tan: {
          DEFAULT: '#E8E0D4',
          dark: '#D4CBBD',
          light: '#F0EBE3',
        },
        terra: {
          DEFAULT: '#C4654A',
          light: '#D4856E',
          dark: '#A8503A',
          faint: '#F5E6E0',
        },
      },
    },
  },
  plugins: [],
};
export default config;
