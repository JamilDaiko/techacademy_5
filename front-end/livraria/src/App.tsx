import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import Footer from "./components/components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Livros from "./pages/Livros";
import Autores from "./pages/Autores";
import Categoria from "./pages/Categoria"; 
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import MinhaConta from "./pages/MinhaConta";
import PrivateRoute from "./components/components/ui/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        
        <Route
          element={
            <PrivateRoute>
              
              <div className="flex flex-col min-h-screen">
                <Header />

               
                <main className="flex-grow">
                  <Outlet />
                </main>

                <Footer />
              </div>
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/categoria" element={<Categoria />} /> 
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;