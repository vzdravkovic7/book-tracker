/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        background: "#1f2937",
        backgroundLight: "#ffffff",
        textLight: "#d1d5db",
        textDark: "#1f2937",
        textAccept: "#60a5fa",
        textAlert: "#f87171",
      },
      fontFamily: {
        heading: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        spinOnce: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-once": "spinOnce 0.5s linear",
      },
    },
  },
  plugins: [],
};

