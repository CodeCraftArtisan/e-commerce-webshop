/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Adjust paths based on your project
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#374151", // Tailwind's `text-gray-700`
        },
        secondary: {
          DEFAULT: "#6B7280", // Tailwind's `text-gray-500`
        },
        btn: {
          DEFAULT: "#ff9400", // Tailwind's `orange-500`
          hover: "#EA580C", // Tailwind's `orange-600` for hover
        },
        itemsBg: {
          DEFAULT: "#F5F5F5",
        },
        green: {
          DEFAULT: "#85C612",
          darker: "#56A41D",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
