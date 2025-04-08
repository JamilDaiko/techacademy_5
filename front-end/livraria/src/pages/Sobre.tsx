import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg";

function Sobre() {
  return (
    <main className="max-w-[1220px] px-2.5 m-auto py-5 grid-cols-2 gap-5">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg my-16"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg">
          <h2 className="text-3xl font-bold text-black mb-4">Sobre a Eco Livraria 📚</h2>
          <p className="text-black mb-4 font-light">
            Seja bem-vindo à <strong>Eco Livraria</strong>, uma plataforma feita para leitores que amam explorar, organizar e compartilhar suas experiências com livros. Aqui, você pode cadastrar obras, autores, gêneros e ainda deixar seus próprios comentários e avaliações. É mais do que uma estante — é o seu espaço literário personalizado!
          </p>

          <h3 className="text-2xl font-semibold text-black mb-2">🌟 Uma Plataforma de Reviews e Registro Literário</h3>
          <p className="text-black mb-4 font-light">
            Na Eco Livraria, você pode:
          </p>
          <ul className="list-disc list-inside text-black mb-4 font-light">
            <li>🔹 Cadastrar <strong>livros, autores e gêneros</strong>.</li>
            <li>🔹 Comentar e avaliar suas leituras favoritas.</li>
          </ul>
          <p className="text-black mb-4 font-light">
            Acreditamos que cada leitura é uma experiência única, e queremos que você tenha um espaço para expressar isso com liberdade.
          </p>

          <h3 className="text-2xl font-semibold text-black mb-2">📚 O Que Você Vai Encontrar</h3>
          <p className="text-black mb-4 font-light">
            Nosso catálogo está sempre crescendo com novos títulos e categorias como:
          </p>
          <ul className="list-disc list-inside text-black mb-4 font-light">
            <li>✅ Ficção e Fantasia</li>
            <li>✅ Suspense e Mistério</li>
            <li>✅ Romance e Drama</li>
            <li>✅ Ciência e Conhecimento</li>
          </ul>

          <h3 className="text-2xl font-semibold text-black mb-2">🌱 Por Que "Eco" Livraria?</h3>
          <p className="text-black mb-4 font-light">
            O nome Eco vem do nosso desejo de promover uma relação mais consciente com a leitura. Valorizamos o compartilhamento de experiências, a reutilização de ideias e a preservação de boas histórias. É uma leitura com propósito — sustentável, colaborativa e inspiradora.
          </p>

          <h3 className="text-2xl font-semibold text-black mb-2">💡 Uma Experiência Simples e Intuitiva</h3>
          <p className="text-black mb-4 font-light">
            Desenvolvemos a Eco Livraria pensando em você:
          </p>
          <ul className="list-disc list-inside text-black mb-4 font-light">
            <li>🔹 Cadastre autores, categoria e livros de forma prática.</li>
            <li>🔹 Gerencie seu histórico de leitura com facilidade.</li>
            <li>🔹 Deixe comentários, leia opiniões e descubra novas obras.</li>
          </ul>

          <p className="text-black font-light">
            Aqui, cada comentário conta, cada leitura importa. Crie sua conta, compartilhe suas impressões e inspire outros leitores.
          </p>

          <h3 className="text-xl font-bold text-black mt-4">📖 Boas leituras e bons reviews!</h3>
        </CardContent>
      </Card>
    </main>
  );
}

export default Sobre;
