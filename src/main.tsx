// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./index.css";

/**
 * Force production traffic onto https://www.anonvic.com
 * - Skips localhost / 127.0.0.1 for local dev
 */
if (typeof window !== "undefined") {
  const { protocol, hostname, href } = window.location;
  const desiredHost = "www.anonvic.com";
  const isLocal = /localhost|127\.0\.0\.1/.test(hostname);

  if (!isLocal && (protocol === "http:" || hostname !== desiredHost)) {
    const url = new URL(href);
    url.protocol = "https:";
    url.hostname = desiredHost;
    window.location.replace(url.toString());
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* HashRouter so routes like http://localhost:5173/#/solutions work */}
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </React.StrictMode>
);
