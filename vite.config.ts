import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project site: https://mbroacha.github.io/portfolio/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/portfolio/" : "/",
  plugins: [react()],
}));
