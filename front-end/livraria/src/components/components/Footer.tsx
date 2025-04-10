import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoBook from "../../assets/logo-book.svg";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <footer className="w-full bg-white/10 backdrop-blur-lg shadow-lg border-t border-white rounded-t-[40px]">
      <div className="max-w-screen-xl mx-auto py-2 px-2">
        {" "}
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {" "}
        
          <div className="flex items-center gap-2">
            {" "}
            
            <img src={logoBook} alt="Logo" className="h-20 w-auto" />{" "}
            
            <span className="hidden sm:block font-bold text-sm text-black">
              ECO LIVRARIA
            </span>{" "}
           
          </div>
          <div className="text-black mt-2 md:mt-0 text-xs">
            {" "}
            
            <p>
              Endereço: Av. Irmãos Pereira, 670 - Centro, Campo Mourão - PR,
              87301-010
            </p>
            <p>+55 (11) 1234-5678</p>
            <p>contato@ecolivraria.com</p>
          </div>
        </div>
    
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 text-black mb-4">
          {" "}
          
          <div>
            <h4 className="font-semibold text-sm mb-2">Institucional</h4>{" "}
          
            <ul className="space-y-1 text-xs">
              {" "}
              <li>
              <Link to="/contato" className="transition hover:text-gray-800">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Suporte</h4>{" "}
            <ul className="space-y-1 text-xs">
              {" "}
              <li>
                <a href="/contato" className="transition hover:text-gray-800">
                  Contato
                </a>
              </li>
            </ul>
          </div>
       
          <div>
            <h4 className="font-semibold text-sm mb-2">Livraria</h4>{" "}
            
            <ul className="space-y-1 text-xs">
              <li>
                <Link to="" className="transition hover:text-gray-800">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/livros" className="transition hover:text-gray-800">
                  Livro
                </Link>
              </li>
              <li>
                <Link to="/autores" className="transition hover:text-gray-800">
                  Autores
                </Link>
              </li>
              <li>
                <Link
                  to="/categoria"
                  className="transition hover:text-gray-800"
                >
                  Categoria
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="transition hover:text-gray-800">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="transition hover:text-gray-800">
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  to="/minha-conta"
                  className="transition hover:text-gray-800"
                >
                  Minha Conta
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <button
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
        
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="w-64 bg-white h-full p-6 shadow-lg">
              <button
                className="mb-6 text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              <ul className="space-y-4 text-lg font-semibold text-black">
                <li className="transition hover:text-gray-800 cursor-pointer">
                  Início
                </li>
                <li className="transition hover:text-gray-800 cursor-pointer">
                  livro
                </li>
                <li className="transition hover:text-gray-800 cursor-pointer">
                  autores
                </li>
                <li className="transition hover:text-gray-800 cursor-pointer">
                  categoria
                </li>
                <li className="transition hover:text-gray-800 cursor-pointer">
                  sobre
                </li>
                <li className="transition hover:text-gray-800 cursor-pointer">
                  contato
                </li>
                <li className="transition hover:text-gray-800 cursor-pointer">
                  minha conta
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

     
      <div className="bg-gray-400 text-white text-center py-2">
        {" "}
       
        <p className="text-xs">
          © 2025 ECO LIVRARIA. Todos os direitos reservados.
        </p>{" "}
  
      </div>
    </footer>
  );
};

export default Footer;
