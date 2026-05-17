import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Project site: https://mbroacha.github.io/portfolio/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    return ({
        base: mode === "production" ? "/portfolio/" : "/",
        plugins: [react()],
    });
});
