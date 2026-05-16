/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
theme: {
    extend: {
      colors: {
        cream: "#F7F1E8", // 70% dominant
        charcoal: "#222222", // 20% grounding
        lime: "#A3C94A", // 5% accent (highlights, hovers)
        orange: "#D97A2B", // 5% accent (CTAs, tags)
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}