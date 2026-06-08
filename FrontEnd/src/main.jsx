import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

axios.interceptors.request.use((config) => {
  if (typeof config.url === "string" && config.url.startsWith("http://localhost:5000")) {
    config.url = config.url.replace("http://localhost:5000", API_BASE_URL);
  }
  return config;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);