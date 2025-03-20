import { useState } from "react";
import { useNavigate } from "react-router-dom";
import esteticaCard from "../../assets/estetica-card.jpg";
import starHalf from "../../assets/star-half.svg"; // Importe o SVG

export function CustomCard() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    navigate("/favoritos");
  };

  const handleViewClick = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div
      className="w-[33%] h-[300px] bg-cover bg-center rounded-lg shadow-lg px-4 py-8"
      style={{ backgroundImage: `url(${esteticaCard})` }}
    >
      <img src="" alt="" />
      {isAccordionOpen && (
        <div className="mt-4 bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold">Mais Informações</h2>
          <p>"Este livro oferece uma introdução prática e acessível à programação, cobrindo desde os conceitos fundamentais até técnicas avançadas. Com exemplos claros e exercícios interativos, é ideal tanto para iniciantes quanto para aqueles que desejam aprimorar suas habilidades. Aprenda a resolver problemas complexos, entender algoritmos e estruturas de dados, e a construir aplicações reais usando uma das linguagens mais populares do mercado."</p>
        </div>
      )}
      <div className="flex justify-between gap-5 items-center mt-4">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={handleFavoriteClick}
        >
          <img src={starHalf} alt="Favorito" className="w-4 h-4" /> Favorito
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={handleViewClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-view-list" viewBox="0 0 16 16">
            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
          </svg> View
        </button>
      </div>
    </div>
  );
}

export default CustomCard;
