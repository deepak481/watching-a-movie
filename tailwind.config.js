/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#232D3F', // Rich navy blue
          light: '#008170', // Soft sky blue
          dark: '#0F0F0F', // Deep midnight blue
        },
      },
    },
  },
  plugins: [],
};
