import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./css/GlobalStyle";
import Reset from "./css/Resest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
