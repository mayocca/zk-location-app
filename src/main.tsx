import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { WasmProvider } from "@/lib/providers/init-wasm";
import { AppKitProvider } from "@/lib/providers/wagmi";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppKitProvider>
      <WasmProvider>
        <App />
      </WasmProvider>
    </AppKitProvider>
  </StrictMode>,
);
