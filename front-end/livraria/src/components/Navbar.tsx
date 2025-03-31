import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul className="flex space-x-4">
        {/* Outras abas */}
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;