import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-background) / <alpha-value>)",
        ink: "rgb(var(--color-text) / <alpha-value>)",
        subtext: "rgb(var(--color-text-muted) / <alpha-value>)",
        line: "rgb(var(--color-border) / <alpha-value>)",
        panel: "rgb(var(--color-surface) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        serif: ["var(--font-family-serif)"],
        mono: ["var(--font-family-mono)"],
        /* Literal stack so Caveat resolves even if a var() chain is dropped; matches Google Fonts family name. */
        hand: ["Caveat", "Segoe Print", "Bradley Hand", "Apple Chancery", "cursive"],
      },
      maxWidth: {
        prose: "var(--max-width-prose)",
        content: "var(--max-width-content)",
        page: "var(--max-width-page)",
      },
      spacing: {
        rail: "var(--max-width-rail)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
