import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Assurez-vous que les chemins correspondent à votre structure de projet
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#E9D5FF",
          400: "#C084FC",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        "holistic-blue": "#1e3a8a",
      },
    },
  },
  plugins: [forms],
};
