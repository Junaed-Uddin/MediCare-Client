/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a855f7",
          "secondary": "#2563eb",
          "accent": "#f59e0b",
          "neutral": "#322E38",
          "base-100": "#F5F5F5",
          "info": "#A6D9ED",
          "success": "#22c55e",
          "warning": "#FBB018",
          "error": "#b91c1c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
