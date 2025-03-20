import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoBook from "../../assets/logo-book.svg";

const Footer: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <footer className="w-full bg-white/10 backdrop-blur-lg shadow-lg border-t border-white rounded-t-[40px] ">
      <div className="max-w-screen-xl mx-auto py-6 px-6">
        {/* Logo e Informações de Contato */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img src={logoBook} alt="Logo" className="h-12 w-auto" />
            <span className="hidden sm:block font-bold text-lg text-black">ECO LIVRARIA</span>
          </div>

          <div className="text-black mt-4 md:mt-0">
            <p className="text-sm">Rua Exemplo, 123 - São Paulo, SP</p>
            <p className="text-sm">+55 (11) 1234-5678</p>
            <p className="text-sm">contato@ecolivraria.com</p>
          </div>
        </div>

        {/* Links para redes sociais */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
            <i className="fab fa-facebook-f text-xl"></i> {/* Substitua pelo ícone de Facebook */}
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
            <i className="fab fa-instagram text-xl"></i> {/* Substitua pelo ícone de Instagram */}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
            <i className="fab fa-twitter text-xl"></i> {/* Substitua pelo ícone de Twitter */}
          </a>
        </div>

        {/* Informações adicionais */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-black mb-6">
          <div>
            <h4 className="font-semibold text-lg">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition hover:text-gray-800">Sobre nós</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Política de privacidade</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Termos de uso</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition hover:text-gray-800">Ajuda</a></li>
              <li><a href="#" className="transition hover:text-gray-800">FAQ</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Loja</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition hover:text-gray-800">Livros em destaque</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Novidades</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Ofertas especiais</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Nosso App</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition hover:text-gray-800">Baixe para iOS</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Baixe para Android</a></li>
            </ul>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(true)}>
          <Bars3Icon className="h-8 w-8" />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="w-64 bg-white h-full p-6 shadow-lg">
              <button className="mb-6 text-black" onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-8 w-8" />
              </button>
              <ul className="space-y-4 text-lg font-semibold text-black">
                <li className="transition hover:text-gray-800 cursor-pointer">Sobre nós</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Ajuda</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Livros em destaque</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Baixe nosso app</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 text-white text-center py-4 mt-4">
        <p className="text-sm">© 2025 ECO LIVRARIA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
