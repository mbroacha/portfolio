import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        subtext: "rgb(var(--color-subtext) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        steel: "rgb(var(--color-steel) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        prose: "var(--layout-prose-max)",
        content: "var(--layout-content-max)",
      },
      spacing: {
        rail: "var(--layout-rail-width)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
      boxShadow: {
        artifact: "0 0 0 1px rgb(var(--color-line) / 0.65), 0 10px 30px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
