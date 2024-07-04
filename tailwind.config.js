/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        "rubik-mono": ["Rubik Mono One", "monospace"],
        pacifico: ["Pacifico", "monospace"]
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}