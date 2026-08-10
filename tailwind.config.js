/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0a0612',
        cosmic: '#120818',
        nebula: '#1a0a2e',
        'hackatl-pink': '#E8327C',
        'hackatl-pink-light': '#FF2D6B',
        'hackatl-pink-dark': '#C42868',
      },
      boxShadow: {
        card: '0 10px 20px rgba(0,0,0,0.12), 0 6px 6px rgba(0,0,0,0.08)',
        glow: '0 0 40px rgba(232, 50, 124, 0.25)',
        'glow-sm': '0 0 20px rgba(232, 50, 124, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
