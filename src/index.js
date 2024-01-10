import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import Callback from "./Callback";

const root = ReactDOM.createRoot(document.getElementById("root"));

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="callback" exact element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
