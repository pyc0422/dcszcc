/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,tsx,jsx,mdx}",

  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      'sm': '600px',
      // => @media (min-width: 600px) { ... }

      'md': '900px',
      // => @media (min-width: 900px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

