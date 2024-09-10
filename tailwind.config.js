/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {  colors: {
      'main': '#2dd3b7',
       'dark': '#3e535a',
        's-dark': '#848c90',
         'light-dark': '#949494',
          's-light': '#eaeceb'
    }}
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
