
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/custom/Header";
import Home from "./pages/Home";



import React from "react";
import Footer from "./components/components/Footer";  // Ajuste o caminho conforme a sua estrutura de pastas



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer /> {/* Aqui está o footer que você criou */}
    </BrowserRouter>
  );
};

export default App;