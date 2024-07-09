import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const ClientID =
  "155788730594-ji9nohfds406o4mo0j8aor6p5msd8rsj.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ClientID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
