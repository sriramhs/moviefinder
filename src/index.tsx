import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import App from "./App";
import MovieCard from "./MovieCard";
import MovieDetailsPage from "./MovieDetailsPage";
import MoviePlot from "./MoviePlot";
import Watch from "./Watch";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/search/:moviename" element={<MovieDetailsPage />} />
      <Route path="/plot/:moviePlot" element={<MoviePlot />} />
      <Route path="/watch/:Id" element={<Watch />} />
    </Routes>
  </Router>
);
