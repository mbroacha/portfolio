import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

/** Router base comes from Vite's base. Served at the domain root, so this is "". */
function getRouterBasename(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
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
