/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        progress: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(300%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        progress: "progress 2s infinite",
      },
    },
    colors: {
      ...colors,
      primary: colors.purple,
      secondary: colors.pink,
    },
  },
  plugins: [],
};
