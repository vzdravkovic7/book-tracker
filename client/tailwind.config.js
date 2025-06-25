/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue-600
        secondary: "#1e40af", // blue-800

        background: "#1f2937",        // gray-800 — used for dark mode bg
        backgroundLight: "#ffffff",   // used for light mode bg

        textLight: "#d1d5db",         // gray-300 — used for dark mode text
        textDark: "#1f2937",          // darker text for white background
        textAccept: "#60a5fa",
        textAlert: "#f87171",
      },
      fontFamily: {
        heading: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
