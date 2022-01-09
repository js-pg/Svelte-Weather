module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: 'class', // or 'media' or 'class'

  variants: {
    extend: {},
  },
  plugins: [
    require('@themesberg/flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
  purge: ["./src/**/*.svelte", "./src/**/*.html"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

    },
    colors: {
        transparent: 'transparent',
        'gray-950': '#14161A',
        'white-sh': 'rgb(255, 255, 255, 0.25)',
        'main-content': '#1e2024',
    },
  }
};
