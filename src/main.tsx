// src/main.tsx (or src/index.tsx)
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./AppRouter";
import "./index.css";

/** Enforce https://www.anonvic.com outside local dev */
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter basename="/">
        <AppRouter />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);
