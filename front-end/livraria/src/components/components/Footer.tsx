import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoBook from "../../assets/logo-book.svg";

const Footer: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <footer className="w-full bg-white/10 backdrop-blur-lg shadow-lg border-t border-white rounded-t-[40px]">
      <div className="max-w-screen-xl mx-auto py-2 px-2"> {/* Reduzido o padding vertical e horizontal */}
        {/* Logo e Informações de Contato */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4"> {/* Reduzido o espaçamento inferior */}
          <div className="flex items-center gap-2"> {/* Reduzido o gap */}
            <img src={logoBook} alt="Logo" className="h-20 w-auto" /> {/* Reduzido o tamanho da logo */}
            <span className="hidden sm:block font-bold text-sm text-black">ECO LIVRARIA</span> {/* Reduzido o tamanho do texto */}
          </div>

          <div className="text-black mt-2 md:mt-0 text-xs"> {/* Reduzido o tamanho do texto */}
            <p>Rua Exemplo, 123 - São Paulo, SP</p>
            <p>+55 (11) 1234-5678</p>
            <p>contato@ecolivraria.com</p>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 text-black mb-4"> {/* Reduzido o gap e o espaçamento inferior */}
          {/* Institucional */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Institucional</h4> {/* Reduzido o tamanho do texto */}
            <ul className="space-y-1 text-xs"> {/* Reduzido o espaçamento e o tamanho do texto */}
              <li><a href="#" className="transition hover:text-gray-800">Sobre nós</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Suporte</h4> {/* Reduzido o tamanho do texto */}
            <ul className="space-y-1 text-xs"> {/* Reduzido o espaçamento e o tamanho do texto */}
              <li><a href="#" className="transition hover:text-gray-800">Contato</a></li>
            </ul>
          </div>

          {/* Loja */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Loja</h4> {/* Reduzido o tamanho do texto */}
            <ul className="space-y-1 text-xs"> {/* Reduzido o espaçamento e o tamanho do texto */}
              <li><a href="#" className="transition hover:text-gray-800">Início</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Sobre</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Contato</a></li>
              <li><a href="#" className="transition hover:text-gray-800">Minha Estante</a></li>
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
                <li className="transition hover:text-gray-800 cursor-pointer">Início</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Sobre</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Contato</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Favoritos</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Minha Estante</li>
                <li className="transition hover:text-gray-800 cursor-pointer">Minha Conta</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Copyright */}
      <div className="bg-gray-400 text-white text-center py-2"> {/* Reduzido o padding vertical */}
        <p className="text-xs">© 2025 ECO LIVRARIA. Todos os direitos reservados.</p> {/* Reduzido o tamanho do texto */}
      </div>
    </footer>
  );
};

export default Footer;
