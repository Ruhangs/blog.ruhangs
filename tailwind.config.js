/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        //utilities like `bg-base` and `bg-primary`
        base: 'var(--color-base)',
        'off-base': 'var(--color-off-base)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-text-muted)',
      },
      textColor: {
        //like `text-base` and `text-primary`
        baseColor: 'var(--color-text-base)',
        muted: 'var(--color-text-muted)',
        'muted-hover': 'var(--color-text-muted-hover)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      borderColor:{
        primary: 'var(--color-primary)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  mode: 'jit',
  darkMode: "class"
}