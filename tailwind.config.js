/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#8B9FE0',
        boxPurple: '#292C36',
        textPurple: '#858997',
      }
    },
    screens: {
      'sm': '640px',    // Small screens, mobile phones
      'md': '768px',    // Medium screens, tablets
      'lg': '1024px',   // Large screens, laptops
      'xl': '1280px',   // Extra large screens, desktops
      '2xl': '1536px',  // Larger screens, 2k monitors
    }
  },
  plugins: [],
}