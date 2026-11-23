import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--ink-900)",
        panel: "var(--ink-800)",
        rule: "var(--rule)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        caption: "rgb(var(--color-text-caption) / <alpha-value>)",
        line: "rgb(var(--color-border) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        display: ["var(--font-family-display)"],
        mono: ["var(--font-family-mono)"],
      },
      maxWidth: {
        prose: "var(--max-width-prose)",
        page: "var(--max-width-page)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      letterSpacing: {
        mono: "0.12em",
      },
    },
  },
  plugins: [],
} satisfies Config;
