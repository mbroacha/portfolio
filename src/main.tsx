import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
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
