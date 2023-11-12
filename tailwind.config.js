/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      backgroundColor: {
        //utilities like `bg-base` and `bg-primary`
        baseColor: 'var(--color-base)',
        secondary: 'var(--color-secondary)',
        thirdary: 'var(--color-thirdary)',
        'off-base': 'var(--color-off-base)',
        primary: 'var(--color-primary)',
        muted: 'var(--color-text-muted)',
        tag: 'var(--color-tag)'
      },
      textColor: {
        //like `text-base` and `text-primary`
        baseColor: 'var(--color-text-base)',
        secondary: 'var(--color-text-secondary)',
        thirdary: 'var(--color-text-thirdary)',
        muted: 'var(--color-text-muted)',
        'muted-hover': 'var(--color-text-muted-hover)',
        primary: 'var(--color-primary)',
      },
      borderColor:{
        primary: 'var(--color-primary)',
        light: 'var(--color-text-base)',
        dark: 'var(--color-secondary)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fill:{
        baseColor: 'var(--color-text-base)',
      }
    },
  },
  plugins: [],
  mode: 'jit',
  darkMode: "class"
}