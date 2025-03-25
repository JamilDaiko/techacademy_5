import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/custom/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/components/Footer";  // Ajuste o caminho conforme a sua estrutura de pastas

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Adicione outras rotas aqui */}
      </Routes>
      <Footer /> {/* Aqui está o footer que você criou */}
    </Router>
  );
};

export default App;