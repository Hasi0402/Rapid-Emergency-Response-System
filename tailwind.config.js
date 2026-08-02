/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0B0D10",
          900: "#12151A",
          800: "#1B1F26",
          700: "#262B33",
          600: "#3A4048",
          400: "#8B93A1",
          200: "#D7DBE0",
          100: "#EDEFF2",
        },
        alert: {
          DEFAULT: "#E23B3B",
          light: "#FF5C5C",
          dark: "#B02A2A",
        },
        signal: {
          amber: "#E8A23D",
          teal: "#2FB3A3",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      keyframes: {
        radar: {
          "0%": { transform: "scale(0.9)", opacity: "0.55" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        radar: "radar 2.2s cubic-bezier(0.2,0.6,0.4,1) infinite",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
