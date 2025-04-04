import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoBook from "../../assets/logo-book.svg";
import { useAuth } from "../../contexts/AuthContext"; 

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth(); // Função de logout do contexto
  const navigate = useNavigate(); // Hook para redirecionar

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Remove o token e limpa o estado de autenticação
    console.log("Usuário deslogado");
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <header className="bg-white/10 backdrop-blur-lg shadow-lg border-b border-white rounded-b-[40px] gap-2.5 flex justify-between items-center py-4 px-6">
      <nav className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoBook} alt="Logo" className="h-18 w-auto" />
          <span className="hidden sm:block font-bold text-lg text-black">ECO LIVRARIA</span>
        </Link>

        {/* Menu Hamburguer (Mobile) */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-light text-black">
          {[
            { label: "Inicio", path: "/" },
            { label: "Sobre", path: "/sobre" },
            { label: "Contato", path: "/contato" },
            { label: "Minha Estante", path: "/minha-estante" },
            { label: "Minha Conta", path: "/minha-conta" },
          ].map((item) => (
            <li
              key={item.label}
              className="transition hover:text-gray-800 cursor-pointer"
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-lg flex flex-col space-y-4 text-lg font-light text-black p-4 md:hidden">
            {[
              { label: "Inicio", path: "/" },
              { label: "Sobre", path: "/sobre" },
              { label: "Contato", path: "/contato" },
              { label: "Minha Estante", path: "/minha-estante" },
              { label: "Minha Conta", path: "/minha-conta" },
            ].map((item) => (
              <li
                key={item.label}
                className="transition hover:text-gray-800 cursor-pointer"
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
