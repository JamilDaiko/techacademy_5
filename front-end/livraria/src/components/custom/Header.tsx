import logoBook from "../../assets/logo-book.svg";

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
          {[
            { label: "Inicio", path: "/" },
            { label: "Sobre", path: "/sobre" },
            { label: "Contato", path: "/contato" },
            { label: "Favoritos", path: "/favoritos" },
            { label: "Minha Estante", path: "/minha-estante" },
            { label: "Minha Conta", path: "/minha-conta" },
          ].map((item) => (
            <li key={item.label} className="transition hover:text-gray-800 cursor-pointer">
              <a href={item.path}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

    </header>
  );
};

export default Header;
