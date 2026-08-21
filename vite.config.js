import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Staging: https://mbroacha.github.io/portfolio/
// Flip to the custom domain by following DEPLOY.md. Do not add public/CNAME until
// morganbroacha.com is ready to move, or GitHub Pages will claim the domain.
export default defineConfig(function (_a) {
    var mode = _a.mode;
    return ({
        base: mode === "production" ? "/portfolio/" : "/",
        plugins: [react()],
    });
});
