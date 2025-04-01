import CustomCard from "../components/custom/Card";
import { Card, CardContent } from "../components/components/ui/card"; // Importar o Card e CardContent
import fundoCardSobre from "../assets/fundo-cardsobre.jpg"; // Importar a imagem
import logoBook from "../assets/logo-book.svg"; // Importar a imagem do logo

function Home() {
  return (
    <>
      <main className="max-w-[1220px] px-2.5 m-auto py-5 grid-cols-2 gap-5">
        {/* Substituir "my library" pelo conteúdo do header */}
        <div className="flex items-center justify-center gap-4 pb-1">
          <img src={logoBook} alt="Logo" className="h-35 w-auto" /> {/* Alterado de h-12 para h-16 */}
          <h1 className="text-3xl font-bold text-center text-black">ECO LIVRARIA</h1>
        </div>

        {/* Card Sobre a Livraria (Acima dos 3 cards) */}
        <Card
          className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg my-16"
          style={{ backgroundImage: `url(${fundoCardSobre})` }}
        >
          <CardContent className="p-8 text-center md:text-left rounded-lg">
            <h2 className="text-2xl text-black mb-4 font-light">Sobre a Nossa Livraria</h2>
            <p className="text-black mb-4 font-light">
            📖 Bem-vindo à Nossa Livraria!
            </p>
            <p className="text-black mb-4 font-light">
              Aqui você encontra um universo de histórias! Nossa livraria oferece uma seleção incrível de livros, desde clássicos atemporais até os lançamentos mais esperados. E para dar um gostinho do que te espera, logo abaixo você confere três exemplares que fazem parte da nossa estante – e que você pode encontrar diretamente no menu de navegação!
            </p>
          </CardContent>
        </Card>

        {/* Três Cards */}
        <div className="flex justify-between flex-wrap w-full">
          <CustomCard />
          <CustomCard />
          <CustomCard />
        </div>

        {/* Card Sobre a Livraria (Abaixo dos 3 cards) */}
        <Card
          className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg my-16"
          style={{ backgroundImage: `url(${fundoCardSobre})` }}
        >
          <CardContent className="p-8 text-center md:text-left rounded-lg">
            <h3 className="text-lg text-black mb-2 font-light"> 📚 Navegue pelo site e descubra mais:</h3>
            <ul className="list-disc list-inside text-black mb-4 font-light">
              <li> Minha Estante – Explore todos os livros disponíveis.</li>
              <li> Sobre Nós – Saiba mais sobre nossa livraria.</li>
              <li> Contato – Precisa falar conosco? Encontre a página de contato.</li>
              <li> Minha Conta – Acesse e gerencie sua conta com facilidade.</li>
            </ul>
            <p className="text-black font-light">
              Aproveite sua jornada literária e boas leituras! 📖
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default Home;
