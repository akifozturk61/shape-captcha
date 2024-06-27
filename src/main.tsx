import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Agreement from "./Agreement.tsx";
import App from "./App.tsx";
import EndGame from "./EndGame.tsx";
import "./index.css";
import StartGame from "./startGame.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Agreement />} />
        <Route path="/startGame" element={<StartGame />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/app" element={<App />} />
        <Route path="/endGame" element={<EndGame />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
