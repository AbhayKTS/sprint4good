/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f7f1e8', // warm beige
        primary: '#0a6c5a', // deep green
        secondary: '#0e4c92', // deep blue alternative
        accent: '#e07a2d', // earthy saffron
        ink: '#1f2a33',
        muted: '#6b7280'
      },
      fontFamily: {
        sans: ['\"Inter\"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 15px 40px rgba(20, 40, 50, 0.08)'
      },
      backgroundImage: {
        texture: 'radial-gradient(circle at 20% 20%, rgba(224, 122, 45, 0.06), transparent 25%), radial-gradient(circle at 80% 0%, rgba(10, 108, 90, 0.08), transparent 25%)'
      }
    },
  },
  plugins: [],
};
