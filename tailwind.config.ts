import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        radio: {
          red: '#CC0000',
          dark: '#0A0A0A',
          darker: '#050505',
          gray: '#1A1A1A',
          light: '#2A2A2A'
        }
      },
    },
  },
  plugins: [],
}
export default config
