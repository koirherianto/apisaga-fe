import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  // content: ['./src/routes/**/*.{svelte,js,ts}'],
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

