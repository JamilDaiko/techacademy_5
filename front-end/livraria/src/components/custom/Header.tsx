import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoBook from "../../assets/logo-book.svg";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, userName, fetchUserName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/login", { replace: true }), 0);
  };

  const menuItems = [
    { label: "Início", path: "/" },
    { label: "Livros", path: "/livros" },
    { label: "Autores", path: "/autores" },
    { label: "Categoria", path: "/categoria" }, 
    { label: "Sobre", path: "/sobre" },
    { label: "Contato", path: "/contato" },
    { label: "Minha Conta", path: "/minha-conta" },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-lg shadow-lg border-b border-white rounded-b-[40px] gap-2.5 flex justify-between items-center py-4 px-6">
      <nav className="flex items-center justify-between w-full">
        
        <Link to="/" className="flex items-center gap-2">
          <img src={logoBook} alt="Logo" className="h-18 w-auto" />
          <span className="hidden sm:block font-bold text-lg text-black">ECO LIVRARIA</span>
        </Link>

        
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        
        <ul className="hidden md:flex space-x-8 text-lg font-light text-black items-center">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
          {userName && (
            <li className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-xl text-sm font-medium text-gray-800 shadow-sm animate-[fade-in_0.4s_ease-out_forwards]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0H4.5z" />
              </svg>
              <span>Olá, <span className="font-semibold">{userName}</span></span>
            </li>
          )}
        </ul>

        
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-lg flex flex-col space-y-4 text-lg font-light text-black p-4 md:hidden z-50">
            {menuItems.map((item) => (
              <li key={item.label} className="transition hover:text-gray-800 cursor-pointer">
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      
      <button
        onClick={handleLogout}
        className="bg-black text-white px-3 py-1 rounded-full hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
