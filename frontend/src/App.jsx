import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Components/Navbar";
import Download from "./Download";
import Admin from "./Admin";
import Mark from "./Mark";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mark" element={<Mark />} />
        <Route path="/download" element={<Download />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
