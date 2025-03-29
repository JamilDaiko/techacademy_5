import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/custom/Header";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
      </Routes>
    </Router>
  );
};

export default App;