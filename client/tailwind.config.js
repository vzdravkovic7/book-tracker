/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue-600
        secondary: "#1e40af", // blue-800
        background: {
          DEFAULT: "#1f2937", // gray-800
          light: "#111827", // gray-900
        },
        text: {
          light: "#d1d5db", // gray-300
          dark: "#111827", // gray-900
          accept: "#60a5fa", // blue-400
          alert: "#f87171", // red-400
        },
      },
      fontFamily: {
        heading: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    }
  },
  plugins: [],
}
