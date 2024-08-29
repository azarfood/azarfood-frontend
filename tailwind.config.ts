import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        vazirmatn: ['var(--font-vazirmatn)'],
        sans: ['var(--font-vazirmatn)'],
      },
    },
  },
  plugins: [],
};
export default config;
