/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0c0f2a',
        plum: '#7a4dd8',
        orchid: '#b06cff',
        lavender: '#e6dbf7',
        ocean: '#0f1035',
        indigo: '#1b1570',
        card: '#2b158a',
      },
      boxShadow: {
        card: '0 10px 20px rgba(0,0,0,0.12), 0 6px 6px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

