import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import "@fontsource/caveat/500.css";
import "@fontsource/caveat/600.css";
import App from "./App";
import "./index.css";

/** Prefer Vite base; fall back to first path segment for GitHub Pages project sites. */
function getRouterBasename(): string {
  const fromEnv = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (fromEnv && fromEnv !== "/") return fromEnv;

  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  return segment ? `/${segment}` : "";
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

rootEl.dataset.appReady = "true";

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter basename={getRouterBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
