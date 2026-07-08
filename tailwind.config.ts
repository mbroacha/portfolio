import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        moss: "var(--moss)",
        fern: "var(--fern)",
        hedge: "var(--hedge)",
        bone: "var(--bone)",
        sage: "var(--sage)",
        lichen: "var(--lichen)",
        glow: "var(--glow)",
        "glow-hover": "var(--glow-hover)",
        ember: "var(--ember)",
        bg: "rgb(var(--color-background) / <alpha-value>)",
        ink: "rgb(var(--color-text) / <alpha-value>)",
        subtext: "rgb(var(--color-text-muted) / <alpha-value>)",
        caption: "rgb(var(--color-text-caption) / <alpha-value>)",
        line: "rgb(var(--color-border) / <alpha-value>)",
        panel: "rgb(var(--color-surface) / <alpha-value>)",
        module: "rgb(var(--color-module) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        display: ["var(--font-family-display)"],
        mono: ["var(--font-family-mono)"],
        lexend: ['"Lexend Deca"', "system-ui", "sans-serif"],
        hand: ["Caveat", "Segoe Print", "Bradley Hand", "Apple Chancery", "cursive"],
      },
      maxWidth: {
        prose: "var(--max-width-prose)",
        content: "var(--max-width-content)",
        page: "var(--max-width-page)",
      },
      spacing: {
        rail: "var(--max-width-rail)",
        gutter: "var(--page-gutter)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      letterSpacing: {
        mono: "0.12em",
        "mono-wide": "0.16em",
        "mono-tight": "0.1em",
      },
      transitionDuration: {
        brand: "150ms",
      },
      backgroundImage: {
        "hero-gradient": "var(--gradient-hero)",
        "footer-gradient": "var(--gradient-footer)",
        placeholder: "var(--gradient-placeholder)",
      },
    },
  },
  plugins: [],
} satisfies Config;
