import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
// import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  // content: ['./src/routes/**/*.{svelte,js,ts}'],
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      colors: {
        magnum: {
          '50': '#fff9ed',
          '100': '#fef2d6',
          '200': '#fce0ac',
          '300': '#f9c978',
          '400': '#f7b155',
          '500': '#f38d1c',
          '600': '#e47312',
          '700': '#bd5711',
          '800': '#964516',
          '900': '#793a15',
          '950': '#411c09'
        },
        neutral: {
          '50': '#f9f9f9',
          '100': '#f3f3f3',
          '200': '#e9e9e9',
          '300': '#d6d6d6',
          '400': '#b3b3b3',
          '500': '#808080',
          '600': '#4d4d4d',
          '700': '#333333',
          '800': '#262626',
          '900': '#1a1a1a'
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace'
        ]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              position: 'relative',
              borderRadius: theme('borderRadius.md')
            }
          }
        }
      })
    }
  },
  plugins: [
    daisyui,
    typography,
    plugin(function ({ addVariant, matchUtilities, theme }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      // Square utility
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value
          })
        },
        { values: theme('spacing') }
      )
    })
  ]
}

