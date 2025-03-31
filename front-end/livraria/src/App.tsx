import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/custom/Header";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";
import Home from "./pages/Home";
import Footer from "./components/components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          {/* A rota inicial agora renderiza o componente Home */}
          <Route path="/" element={<Home />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          {/* Nova rota para o formulário de login */}
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;