import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served at https://morganbroacha.com/ (custom domain via public/CNAME).
export default defineConfig({
  base: "/",
  plugins: [react()],
});
