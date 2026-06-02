import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F3A2E',
          dark: '#2D5240',
          light: '#7FA68F',
        },
        accent: '#C9A86A',
        bgdark: '#080808',
        bgdeep: '#101001',
        title: '#E7E7E7',
        textlight: '#CECECA',
        textdark: '#3D3D3D',
        muted: '#999999',
        danger: '#FE2B54',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
