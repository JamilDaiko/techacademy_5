import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import Footer from "./components/components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MinhaConta from "./pages/MinhaConta";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import PrivateRoute from "./components/components/ui/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas pelo PrivateRoute */}
        <Route
          element={
            <PrivateRoute>
              <div className="flex flex-col min-h-screen">
                <Header />
                <Outlet />
                <Footer />
              </div>
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
