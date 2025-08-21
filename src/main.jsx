import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { AppProvaider } from "./context/appContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvaider>
      <App />
    </AppProvaider>
  </React.StrictMode>
);
