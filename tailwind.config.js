/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/connected/**/*.{js,jsx,ts,tsx}',
  ],
  //mode: 'jit', //enables just-in-time mode
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      degular: ['Degular', 'sans-serif'],
      degularDisplay: ['Degular Display', 'sans-serif'],
    },
    colors: {
      white: '#ffffff',
      gray: {
        50: '#EFF1F6',
        100: '#DBDEE5',
        200: '#D9D9D9',
        300: '#888F95',
        400: '#56616B',
        DEFAULT: '#56616B',
      },
      black: {
        50: '#5C6670',
        // 100: ,
        // 200: ,
        300: '#131316',
        DEFAULT: '#131316',
      },
    },
    extend: {
      boxShadow: {
        main: '0px 6px 12px 0px #5C738314,  0px 4px 8px 0px #5C738314',
        sec: '0px 2px 4px 0px #2D3B430D, 0px 2px 6px 0px #2D3B430F',
      },
    },
  },
  plugins: ['@tailwindcss/forms'],
};
