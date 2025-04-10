import CustomCard from "../components/custom/Card";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg";
import logoBook from "../assets/logo-book.svg";

import alemVeu from "../assets/alem-veu.webp";
import sombras from "../assets/sombras-passado.webp";
import ultimoGuardiao from "../assets/ultimo-guardiao.webp";

function Home() {
  return (
    <>
      <main className="max-w-[1220px] px-2.5 m-auto py-5 grid-cols-2 gap-5">
        <div className="flex items-center justify-center gap-4 pb-1">
          <img src={logoBook} alt="Logo" className="h-35 w-auto" />
          <h1 className="text-3xl font-bold text-center text-black">ECO LIVRARIA</h1>
        </div>

       
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
             📚  Livraria de Reviews! Aqui você mergulha em um espaço feito para amantes da leitura! Nosso site é dedicado a compartilhar informações sobre livros, autores e avaliações. Explore títulos com descrições detalhadas, descubra novos autores, deixe notas para outros leitores e registre seus próprios comentários – assim você ajuda a comunidade e também guarda suas impressões pessoais. Role para baixo e confira alguns dos livros em destaque – e não deixe de explorar mais através do nosso menu de navegação!
            </p>
          </CardContent>
        </Card>

        
        <div className="flex justify-between flex-wrap w-full">
          <CustomCard
            image={sombras}
            title="📖 Sombras do Passado"
            author="Eduardo Vasquez"
            genre="Suspense / Terror"
            description="Ao herdar uma antiga mansão esquecida no interior, Miguel decide explorá-la em busca de suas origens familiares. No entanto, ao entrar na casa, ele começa a perceber que não está sozinho..."
          />
          <CustomCard
            image={ultimoGuardiao}
            title="⚔️ O Último Guardião"
            author="Helena D’Almeida"
            genre="Fantasia Épica"
            description="No reino de Eldoria, a profecia anuncia que quando o portal ancestral se abrir, as forças do caos retornarão. Ethan, um jovem guerreiro, descobre ser o último descendente dos Guardiões..."
          />
          <CustomCard
            image={alemVeu}
            title="🪞 Além do Véu"
            author="Ricardo Monteiro"
            genre="Suspense / Fantasia Sombria"
            description="Lara sempre teve pesadelos estranhos, mas quando encontra um antigo espelho em sua nova casa, descobre que ele é um portal para uma dimensão esquecida..."
          />
        </div>

    
        <Card
          className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg my-16"
          style={{ backgroundImage: `url(${fundoCardSobre})` }}
        >
          <CardContent className="p-8 text-center md:text-left rounded-lg">
            <h3 className="text-lg text-black mb-2 font-light">📚 Navegue pelo nosso site e aproveite tudo o que preparamos para você:</h3>
            <ul className="list-disc list-inside text-black mb-4 font-light">
              <li>
                <strong>Livros</strong> – Cadastre seus próprios livros! Informe o título, selecione o autor e o gênero, e escreva um comentário sobre a obra.
              </li>
              <li>
                <strong>Autores</strong> – Consulte ou adicione novos autores, mantendo a organização das suas leituras.
              </li>
              <li>
                <strong>Gêneros</strong> – Explore os estilos literários ou crie novos para categorizar melhor seus livros.
              </li>
              <li>
                <strong>Sobre </strong> – Conheça mais sobre nossa livraria virtual e o que nos inspira a promover a leitura.
              </li>
              <li>
                <strong>Contato</strong> – Precisa de ajuda ou quer nos dar sugestões? Fale com a gente por aqui!
              </li>
              <li>
                <strong>Minha Conta</strong> – Atualize seu nome, senha e mantenha seu perfil sempre em dia.
              </li>
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
