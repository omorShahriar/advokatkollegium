/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          gray: "#f8f8f8",
          blue: "#3474BB",
          orange: "#C2834A",
          dawn: "#FFF9E9",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        "dm-serif": ["var(--font-dm-serif)", "serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
    },
  },
  plugins: [],
};
