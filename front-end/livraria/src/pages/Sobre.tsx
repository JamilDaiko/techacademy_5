import { Card, CardContent } from "../components/components/ui/card"; // Importar o Card e CardContent
import fundoCardSobre from "../assets/fundo-cardsobre.jpg"; // Imagem de fundo (opcional)

function Sobre() {
  return (
    <main className="max-w-[1220px] px-2.5 m-auto py-5 grid-cols-2 gap-5">
      {/* Card Sobre a Eco Livraria */}
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg my-16"
        style={{ backgroundImage: `url(${fundoCardSobre})` }} // Adiciona imagem de fundo (opcional)
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg">
          <h2 className="text-3xl font-bold text-black mb-4">Sobre a Eco Livraria 📚</h2>
          <p className="text-black mb-4 font-light">
            Bem-vindo à Eco Livraria, um espaço criado para apaixonados por livros e histórias inesquecíveis! Aqui, acreditamos que a leitura transforma vidas e abre portas para novos mundos.
          </p>

          <h3 className="text-2xl font-semibold text-black mb-2"> Nossa Missão</h3>
          <p className="text-black mb-4 font-light">
            Nossa missão é conectar leitores com histórias que inspiram, emocionam e fazem refletir. Queremos tornar a literatura acessível a todos, promovendo uma experiência única de descoberta e aprendizado.
          </p>

          <h3 className="text-2xl font-semibold text-black mb-2">🌱 Compromisso com a Sustentabilidade</h3>
          <p className="text-black mb-4 font-light">
            Na Eco Livraria, valorizamos o impacto positivo no meio ambiente. Buscamos parcerias com editoras e fornecedores que compartilham do nosso compromisso com práticas sustentáveis, como o uso de papel reciclado e impressão ecológica. Além disso, incentivamos a troca e reutilização de livros, ajudando a reduzir o desperdício e promovendo um consumo mais consciente.
          </p>

          <h3 className="text-2xl font-semibold text-black mb-2">📚 O Que Você Encontra Aqui</h3>
          <p className="text-black mb-4 font-light">
            Nossa estante virtual está sempre recheada de boas histórias, desde os clássicos atemporais até os lançamentos mais esperados. Você pode explorar categorias variadas, como:
          </p>
          <ul className="list-disc list-inside text-black mb-4 font-light">
            <li>✅ Ficção e Fantasia</li>
            <li>✅ Drama</li>
            <li>✅ Suspense e Mistério</li>
            <li>✅ Ciência e Conhecimento</li>
          </ul>

          <h3 className="text-2xl font-semibold text-black mb-2"> Uma Experiência Completa</h3>
          <p className="text-black mb-4 font-light">
            Nosso site foi desenvolvido para oferecer uma navegação intuitiva e prática. Você pode:
          </p>
          <ul className="list-disc list-inside text-black mb-4 font-light">
            <li>🔹 Explorar nossa estante e encontrar os melhores títulos.</li>
            <li>🔹 Criar sua conta para gerenciar seus livros favoritos.</li>
            <li>🔹 Entrar em contato conosco sempre que precisar de ajuda ou indicações literárias.</li>
          </ul>

          <p className="text-black font-light">
            Aqui na Eco Livraria, cada página virada é uma nova aventura. Explore, descubra e mergulhe em histórias que vão marcar sua vida!
          </p>

          <h3 className="text-xl font-bold text-black mt-4"> Boas leituras!</h3>
        </CardContent>
      </Card>
    </main>
  );
}

export default Sobre;