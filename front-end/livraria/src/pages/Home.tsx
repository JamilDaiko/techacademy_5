import CustomCard from "../components/custom/Card";
import { Card, CardContent } from "../components/components/ui/card"; // Importar o Card e CardContent
import fundoCardSobre from "../assets/fundo-cardsobre.jpg"; // Importar a imagem
import logoBook from "../assets/logo-book.svg"; // Importar a imagem do logo

// Importar as imagens dos livros
import alemVeu from "../assets/alem-veu.webp";
import sombras from "../assets/sombras-passado.webp";
import ultimoGuardiao from "../assets/ultimo-guardiao.webp";

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
          <CustomCard
            image={sombras}
            title="📖 Sombras do Passado"
            author="Eduardo Vasquez"
            genre="Suspense / Terror"
            description="Ao herdar uma antiga mansão esquecida no interior, Miguel decide explorá-la em busca de suas origens familiares. No entanto, ao entrar na casa, ele começa a perceber que não está sozinho. Vozes sussurram pelos corredores, sombras se movem onde não deveriam, e segredos há muito enterrados começam a emergir. Em meio ao medo e à dúvida, Miguel precisa desvendar a verdade sobre sua família antes que seja tarde demais – ou se tornar mais um entre os espíritos que assombram a propriedade."
          />
          <CustomCard
            image={ultimoGuardiao}
            title="⚔️ O Último Guardião"
            author="Helena D’Almeida"
            genre="Fantasia Épica"
            description="No reino de Eldoria, a profecia anuncia que quando o portal ancestral se abrir, as forças do caos retornarão. Ethan, um jovem guerreiro criado como um simples ferreiro, descobre ser o último descendente dos Guardiões, a única linhagem capaz de selar o portal. Com a ajuda de aliados improváveis – uma maga exilada e um ladrão de bom coração –, ele deve enfrentar criaturas sombrias, superar traições e, acima de tudo, dominar o poder que corre em suas veias antes que a destruição engula o mundo."
          />
          <CustomCard
            image={alemVeu}
            title="🪞 Além do Véu"
            author="Ricardo Monteiro"
            genre="Suspense / Fantasia Sombria"
            description="Lara sempre teve pesadelos estranhos, mas quando encontra um antigo espelho no porão de sua nova casa, suas visões tomam forma real. A cada noite, o reflexo parece se mexer de maneira independente, e uma figura encapuzada a observa do outro lado. Aos poucos, Lara descobre que o espelho é um portal para uma dimensão esquecida, onde almas aprisionadas clamam por libertação. Mas para libertá-las, ela precisará fazer um sacrifício – e talvez nunca mais possa retornar."
          />
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
