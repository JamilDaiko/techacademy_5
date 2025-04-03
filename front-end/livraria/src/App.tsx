import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/custom/Header";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";
import Home from "./pages/Home";
import Footer from "./components/components/Footer";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato"; // Importar o componente Contato

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} /> {/* Nova rota para Contato */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;