import logoBook from "../../assets/logo-book.svg";
import { MenuHeader } from "./MenuHeader";

const Header: React.FC = () => {  
  return (
    <header className=" bg-white/10 backdrop-blur-lg shadow-lg border-b border-white rounded-b-[40px] gap-2.5 || flex justify-between items-center || py-4 px-6 ">
      <nav className="flex items-center justify-between || w-full">
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
      </nav>

      <MenuHeader/>
    </header>
  );
};

export default Header;
