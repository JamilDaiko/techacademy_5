import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoBook from "../../assets/logo-book.svg";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/10 backdrop-blur-lg shadow-lg border-b border-white rounded-b-[40px]">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={logoBook} alt="Logo" className="h-12 w-auto" />
          <span className="hidden sm:block font-bold text-lg text-black">ECO LIVRARIA</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-light text-black">
          {["Home", "About", "Contact", "Assinature"].map((item) => (
            <li key={item} className="transition hover:text-gray-800 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(true)}>
          <Bars3Icon className="h-8 w-8" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-64 bg-white h-full p-6 shadow-lg">
            <button className="mb-6 text-black" onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-8 w-8" />
            </button>
            <ul className="space-y-4 text-lg font-semibold text-black">
              {["Home", "About", "Contact", ""].map((item) => (
                <li key={item} className="transition hover:text-gray-800 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
