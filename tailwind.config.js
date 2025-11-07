/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#1a1a1a',
        'secondary-bg': '#2a2a2a',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'accent-orange': '#ff6b35',
        'accent-hover': '#e55a2b',
      },
      fontFamily: {
        'slabo': ['Slabo 27px', 'serif'],
      },
    },
  },
  plugins: [],
}

