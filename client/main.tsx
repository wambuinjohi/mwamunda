import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Prevent multiple root creations during HMR
if (!rootElement._reactRootContainer) {
  createRoot(rootElement).render(<App />);
}
