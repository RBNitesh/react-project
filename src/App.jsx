// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignPage from "./components/signPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignPage />} />
        <Route
          path="/about"
          element={<div className="pt-20 p-6">About Page</div>}
        />
        <Route
          path="/contact"
          element={<div className="pt-20 p-6">Contact Page</div>}
        />
      </Routes>
    </>
  );
};

export default App;
