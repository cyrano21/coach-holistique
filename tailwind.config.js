/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css,module.css}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "carousel-slide": "carouselSlide 20s linear infinite",
        "pause": "none",
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        carouselSlide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '0.25',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.2)',
          },
        },
      },
    },
  },
  plugins: [],
};
