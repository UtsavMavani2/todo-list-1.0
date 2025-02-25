import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import AppRouter from "./AppRouter.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <AppRouter /> */}
    <Toaster position="top-right" />
  </StrictMode>
);
