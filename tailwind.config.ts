import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: "#0A1F17",
          900: "#0F2E22",
          850: "#13382A",
          800: "#1B4736",
          700: "#245F49",
          600: "#327D61",
        },
        gold: {
          50: "#FDFBF2",
          100: "#FAF5DC",
          200: "#F4E8C1",
          300: "#E5C378",
          400: "#D4AF37",
          500: "#C59B27",
          600: "#A8831D",
          700: "#806214",
        },
        cream: {
          50: "#FDFBF7",
          100: "#FAF7F2",
          200: "#F5EFEB",
          300: "#EAE1D7",
          400: "#DDD2C5",
        },
        festive: {
          ruby: "#8A1828",
          maroon: "#5C0F1A",
          amber: "#D97706",
          saffron: "#E65100",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#20BA5A",
          dark: "#128C7E",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(212, 175, 55, 0.25)",
        "gold-lg": "0 10px 30px -4px rgba(212, 175, 55, 0.35)",
        emerald: "0 10px 30px -5px rgba(15, 46, 34, 0.25)",
        luxury: "0 20px 40px -15px rgba(15, 46, 34, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
