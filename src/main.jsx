import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import DetailView from "./routes/DetailView";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index={true} path="/" element={<App />} />
      <Route
        index={false}
        path="/pokemonDetails/:name"
        element={<DetailView />}
      />
    </Routes>
  </BrowserRouter>
);
