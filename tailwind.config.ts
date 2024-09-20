import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        vazirmatn: ['var(--font-vazirmatn)'],
        sans: ['var(--font-vazirmatn)'],
      },

      boxShadow: {
        simple: '0 0 4px rgba(0, 0, 34, 0.20000000298023224)',
        'simple-01': '0 1px 4px rgba(0, 0, 34, 0.4000000059604645)',
        'simple-02': '0 2px 4px rgba(0, 0, 34, 0.20000000298023224)',
      },

      colors: {
        primary: {
          5: 'rgba(255, 132, 4, 0.05000000074505806)',
          20: 'rgba(255, 132, 4, 0.20000000298023224)',
          40: 'rgba(255, 132, 4, 0.4000000059604645)',
          60: 'rgba(255, 132, 4, 0.6000000238418579)',
          80: 'rgba(255, 132, 4, 0.800000011920929)',
          100: 'rgba(255, 132, 4, 1)',
        },
        secondary: {
          5: 'rgba(0, 0, 34, 0.05000000074505806)',
          20: 'rgba(0, 0, 34, 0.20000000298023224)',
          40: 'rgba(0, 0, 34, 0.4000000059604645)',
          60: 'rgba(0, 0, 34, 0.6000000238418579)',
          80: 'rgba(0, 0, 34, 0.800000011920929)',
          100: 'rgba(0, 0, 34, 1)',
        },
        foreground: {
          5: 'rgba(255, 255, 243, 0.05000000074505806)',
          20: 'rgba(255, 255, 243, 0.20000000298023224)',
          40: 'rgba(255, 255, 243, 0.4000000059604645)',
          60: 'rgba(255, 255, 243, 0.6000000238418579)',
          80: 'rgba(255, 255, 243, 0.800000011920929)',
          100: 'rgba(255, 255, 248, 1)',
        },
        error: {
          5: 'rgba(211, 47, 47, 0.05000000074505806)',
          20: 'rgba(211, 47, 47, 0.20000000298023224)',
          40: 'rgba(211, 47, 47, 0.4000000059604645)',
          60: 'rgba(211, 47, 47, 0.6000000238418579)',
          80: 'rgba(211, 47, 47, 0.800000011920929)',
          100: 'rgba(211, 47, 47, 1)',
        },
        success: {
          5: 'rgba(75, 181, 67, 0.05000000074505806)',
          20: 'rgba(75, 181, 67, 0.20000000298023224)',
          40: 'rgba(75, 181, 67, 0.4000000059604645)',
          60: 'rgba(75, 181, 67, 0.6000000238418579)',
          80: 'rgba(75, 181, 67, 0.800000011920929)',
          100: 'rgba(75, 181, 67, 1)',
        },
        star: {
          5: 'rgba(242, 223, 49, 0.05000000074505806)',
          20: 'rgba(242, 223, 49, 0.20000000298023224)',
          40: 'rgba(242, 223, 49, 0.4000000059604645)',
          60: 'rgba(242, 223, 49, 0.6000000238418579)',
          80: 'rgba(242, 223, 49, 0.800000011920929)',
          100: 'rgba(242, 223, 49, 1)',
        },
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.type-2r': {
          fontWeight: '400',
          fontSize: '0.5rem', //8px
          lineHeight: '0.625rem', //10px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-2-5r': {
          fontWeight: '400',
          fontSize: '0.625rem', //10px
          lineHeight: '0.75rem', //12px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-3r': {
          fontWeight: '400',
          fontSize: '0.75rem', //12px
          lineHeight: '1.25rem', //20px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-3-5r': {
          fontWeight: '400',
          fontSize: '0.875rem', //14px
          lineHeight: '1.0625rem', //17px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-4r': {
          fontWeight: '400',
          fontSize: '1rem', //16px
          lineHeight: '1.57rem', //25px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-5r': {
          fontWeight: '400',
          fontSize: '1.25rem', //20px
          lineHeight: '1.9375rem', //31px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-6r': {
          fontWeight: '400',
          fontSize: '1.5rem', //24px
          lineHeight: '2.375rem', //38px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-3m': {
          fontWeight: '500',
          fontSize: '0.75rem', //12px
          lineHeight: '1.25rem', //20px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-3-5m': {
          fontWeight: '500',
          fontSize: '0.875rem', //14px
          lineHeight: '1.0625rem', //17px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-4m': {
          fontWeight: '500',
          fontSize: '1rem', //16px
          lineHeight: '1.57rem', //25px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-3sb': {
          fontWeight: '600',
          fontSize: '0.75rem', //12px
          lineHeight: '1.25rem', //20px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-sb': {
          fontWeight: '600',
          fontSize: '1rem', //16px
          lineHeight: '1.57rem', //25px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-4-5b': {
          fontWeight: '700',
          fontSize: '1.125rem', //18px
          lineHeight: '1.75rem', //28px
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-h1': {
          fontWeight: '500',
          fontSize: '1.5rem',
          lineHeight: '1.75rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-h2': {
          fontWeight: '500',
          fontSize: '1.25rem',
          lineHeight: '1.625rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-h3': {
          fontWeight: '500',
          fontSize: '1.0625rem',
          lineHeight: '1.5rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-h4': {
          fontWeight: '700',
          fontSize: '0.9375rem',
          lineHeight: '1.25rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-h5': {
          fontWeight: '700',
          fontSize: '0.9375rem',
          lineHeight: '1.25rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-h6': {
          fontWeight: '700',
          fontSize: '0.9375rem',
          lineHeight: '1.25rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-body': {
          fontWeight: '400',
          fontSize: '0.9375rem',
          lineHeight: '1.25rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-control': {
          fontWeight: '400',
          fontSize: '0.9375rem',
          lineHeight: '1.25rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-footnote': {
          fontWeight: '400',
          fontSize: '0.8125rem',
          lineHeight: '1.125rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
        '.type-control-label': {
          fontWeight: '400',
          fontSize: '0.8125rem',
          lineHeight: '1.125rem',
          fontFamily: theme('fontFamily.vazirmatn'),
        },
      });
    }),
  ],
};
export default config;
