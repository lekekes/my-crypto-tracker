import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        light: {
          primary: '#3498db', // Helles Blau
          secondary: '#95a5a6', // Gedämpftes Grau
          accent: '#e74c3c', // Helles Rot
          hover: '#2980b9', // Dunkleres Blau
        },
        dark: {
          primary: '#4aa3f0', // Gedämpftes Blau
          secondary: '#7f8c8d', // Weiches Grau
          accent: '#e57373', // Sanftes Rot
          hover: '#3b8ad6', // Intensiveres Blau
        },
      },
    },
  },
  darkMode: 'class', // Aktiviert Dark Mode über die Klasse 'dark'
  plugins: [],
} satisfies Config;
