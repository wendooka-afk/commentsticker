import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App, LazyErrorBoundary } from "./App";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LazyErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LazyErrorBoundary>
  </StrictMode>
);
