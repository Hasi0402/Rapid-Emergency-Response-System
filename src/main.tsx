import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router base={base}>
      <App />
    </Router>
    <Toaster
      theme="dark"
      toastOptions={{
        style: {
          background: "#1B1F26",
          border: "1px solid #262B33",
          color: "#EDEFF2",
        },
      }}
    />
  </React.StrictMode>
);
