import { Card, CardContent } from "../components/components/ui/card"; // Importar o Card e CardContent
import fundoCardContato from "../assets/fundo-cardsobre.jpg"; // Imagem de fundo (opcional)

function Contato() {
  return (
    <main className="max-w-[1220px] px-2.5 m-auto py-5 grid-cols-2 gap-5">
      {/* Card Contato */}
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg my-16"
        style={{ backgroundImage: `url(${fundoCardContato})` }} // Adiciona imagem de fundo (opcional)
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg">
          <h2 className="text-3xl font-bold text-black mb-4"> Fale Conosco</h2>
          <p className="text-black mb-4 font-light">
            Adoramos conversar sobre livros e estamos aqui para ajudar! Seja para tirar dúvidas, sugerir novas leituras ou apenas bater um papo sobre literatura, entre em contato com a gente pelos canais abaixo:
          </p>

          <ul className="list-disc list-inside text-black mb-4 font-light">
            <li>📩 <strong>E-mail:</strong> contato@ecolivraria.com</li>
            <li>🐙 <strong>GitHub:</strong> <a href="https://github.com/ecolivraria" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">github.com/ecolivraria</a></li>
            <li>📸 <strong>Instagram:</strong> <a href="https://instagram.com/ecolivraria" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@ecolivraria</a></li>
          </ul>

          <p className="text-black mb-4 font-light">
            Siga-nos nas redes sociais para ficar por dentro das novidades, lançamentos e recomendações de leitura!
          </p>

          <h3 className="text-2xl font-semibold text-black mb-2">📌 Equipe de Desenvolvimento</h3>
          <p className="text-black mb-4 font-light">
            Quer conhecer mais sobre os desenvolvedores da Eco Livraria? Acompanhe seus contatos nos cards abaixo! Lá você encontra seus e-mails, GitHub e Instagram para saber mais sobre o trabalho por trás do site.
          </p>

          <p className="text-black font-light">
            Estamos sempre prontos para ouvir você. 
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

export default Contato;