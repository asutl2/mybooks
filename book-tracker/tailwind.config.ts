import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5F5DC', // ベージュ
        'primary-dark': '#FFD700', // 濃い緑
        secondary: '#B7410E', // 赤
        'secondary-dark': '#8B0000', // 濃い赤
        accent: '#FFD700', // ゴールド
        'accent-dark': '#CCAC00', // 濃いゴールド
        text: '#2E2E2E', // 黒
        'input-bg': '#FFFFFF', // 白
        'input-text': '#000000', // 黒
        'input-border': '#A9A9A9', // 濃いグレー
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
