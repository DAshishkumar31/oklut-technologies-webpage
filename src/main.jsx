import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "./styles/globals.css";
import App from "./App";
import displayFontUrl from "@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url";
import bodyFontUrl from "@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2?url";

function preloadFont(href) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "font";
  link.type = "font/woff2";
  link.crossOrigin = "anonymous";
  link.href = href;
  document.head.appendChild(link);
}

preloadFont(displayFontUrl);
preloadFont(bodyFontUrl);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LazyMotion>
  </StrictMode>,
);