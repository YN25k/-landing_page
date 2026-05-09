export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FAF8F2',
          100: '#F5F2EB',
          200: '#EBE6DA',
          300: '#DDD6C5',
          500: '#A89F89',
        },
        ink: {
          900: '#1F1F1D',
          700: '#2A2A28',
          500: '#5C5A52',
          400: '#8A877C',
        },
        lime: {
          soft:    '#DFF0AE',
          DEFAULT: '#C5E17A',
          deep:    '#A4C552',
          shadow:  '#8AAD3F',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
