import { Mail, Github, Instagram } from "lucide-react";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg"; 

function FaleConosco() {
  return (
    <main className="max-w-[800px] px-4 m-auto py-10">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-none rounded-lg"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 text-center  rounded-lg">
          <h2 className="text-3xl font-bold text-black mb-6">Fale Conosco 📬</h2>

          <p className="text-black font-light mb-6">
            Adoramos conversar sobre livros e estamos aqui para ajudar! Seja para tirar dúvidas, sugerir novas leituras ou apenas bater um papo sobre literatura, entre em contato com a gente pelos canais abaixo:
          </p>

          <div className="flex flex-col gap-4 items-center mb-6">
            <div className="flex items-center gap-2 text-black">
              <Mail className="w-5 h-5" />
              <span>contato@ecolivraria.com</span>
            </div>
            <a
              href="https://github.com/ecolivraria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>github.com/ecolivraria</span>
            </a>
            <a
              href="https://instagram.com/ecolivraria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-pink-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@ecolivraria</span>
            </a>
          </div>

          <p className="text-black font-light mb-6">
            Siga-nos nas redes sociais para ficar por dentro das novidades, lançamentos e recomendações de leitura!
          </p>

          <h3 className="text-xl font-semibold text-black mb-2">📌 Equipe de Desenvolvimento</h3>
          <p className="text-black font-light">
            Quer conhecer mais sobre os desenvolvedores da Eco Livraria? Acompanhe seus contatos nos cards abaixo! Lá você encontra seus e-mails, GitHub e Instagram para saber mais sobre o trabalho por trás do site.
          </p>

          <p className="text-black font-medium mt-6">Estamos sempre prontos para ouvir você. 📖</p>
        </CardContent>
      </Card>
    </main>
  );
}

export default FaleConosco;
