import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { WasmProvider } from "@/lib/providers/init-wasm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WasmProvider>
      <App />
    </WasmProvider>
  </StrictMode>,
);
