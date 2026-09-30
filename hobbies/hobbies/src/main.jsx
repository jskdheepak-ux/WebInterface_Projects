import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Hobbies.css";
import App from "./Hobbies.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
