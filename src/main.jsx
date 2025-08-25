import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvaider } from "./context/appContext";
import { AuthContext } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <AppProvaider>
        <App />
      </AppProvaider>
    </AuthContext>
  </React.StrictMode>
);
