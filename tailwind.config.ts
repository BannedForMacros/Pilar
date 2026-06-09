import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta cálida y sofisticada: ciruela / rosa / dorado
        plum: {
          DEFAULT: "#3b1d3a",
          deep: "#2a1228",
          soft: "#5a2e57",
        },
        rosa: {
          DEFAULT: "#e8a0bf",
          soft: "#f4c4d6",
          dusk: "#c97b9b",
        },
        gold: {
          DEFAULT: "#e6c068",
          soft: "#f0d89a",
          deep: "#c49a3f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
