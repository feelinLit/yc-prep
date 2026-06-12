import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.4s ease-in-out",
        "slide-up": "slideUp 0.25s ease-out",
        "pop-in": "popIn 0.2s ease-out",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-5px)" },
          "80%": { transform: "translateX(5px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      colors: {
        accent: {
          DEFAULT: "#f26522",
          foreground: "#ffffff",
        },
        gray: {
          100: "#a3afb5",
          300: "#50626a",
          400: "#364850",
          700: "#2d3e45",
          800: "#233238",
          900: "#1f2b30",
        },
        green: {
          50: "#e6f2dc",
          100: "#4cc38a",
          700: "#2a594b",
        },
        purple: {
          50: "#8066ff",
          100: "#7c68e6",
          700: "#3d426b",
        },
        blue: {
          100: "#3b88ff",
          200: "#0a66f5",
          700: "#1a4276",
        },
        red: {
          50: "#ff858c",
          100: "#ff5e66",
          200: "#ff4d55",
          500: "#ff4246",
          700: "#663e46",
        },
        orange: {
          50: "#fff0e6",
          100: "#ffdfcc",
          400: "#ff9040",
          500: "#f26522",
          700: "#8c3810",
        },
        yellow: {
          100: "#ffcc4d",
          700: "#665e3b",
        },
        bright: {
          yellow: "#ffcc4d",
          blue: "#0a66f5",
          red: "#ff5e66",
          green: "#4cc38a",
          orange: "#f26522",
        },
      },
    },
  },
  plugins: [],
};
export default config;
