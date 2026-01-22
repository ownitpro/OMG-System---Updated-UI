import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["'Helvetica Now'", "var(--font-inter)", "sans-serif"], // Clean headline fallback
        italic: ["'Open Sauce One'", "var(--font-outfit)", "sans-serif"], // Italic substitute
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        'muted-foreground': "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        'card-foreground': "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: { DEFAULT: '#22c55e', foreground: '#ffffff' },
        blue: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4', // Cyan Light
          400: '#2dd4bf', // Cyan Teal
          500: '#14b8a6', // Teal Bright
          600: '#0d9488', // Teal Accent 2
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Premium Palette
        teal: {
          dark: '#005468',
          mid: '#0c9092',
          light: '#289294',
          accent: '#5aa5a8'
        },
        cream: {
          DEFAULT: '#ebe8e4',
          light: '#e2dfdb',
          dark: '#c5d0cc'
        },
        slate: {
          DEFAULT: '#334155',
          navy: '#0f2336'
        }
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem' }
    }
  },
  plugins: [
    forms,
  ]
} satisfies Config

