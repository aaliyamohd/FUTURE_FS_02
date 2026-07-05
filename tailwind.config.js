/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FBF9F5',
          200: '#F5F1E9',
        },
        matcha: {
          50: '#F1F5EE',
          100: '#DDE7D9',
          200: '#C2D3C1',
          400: '#9DB79B',
          500: '#7C9A7B',
          600: '#5F7E5F',
          700: '#485F48',
          900: '#2B3A2F',
        },
        border: {
          soft: '#E8E4DD',
        },
        muted: {
          text: '#7C8178',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(43, 58, 47, 0.04), 0 4px 12px rgba(43, 58, 47, 0.05)',
        card: '0 2px 8px rgba(43, 58, 47, 0.06)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
};
