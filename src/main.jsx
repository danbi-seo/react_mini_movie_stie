import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SupabaseProvider } from "./supabase/context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </BrowserRouter>
);
