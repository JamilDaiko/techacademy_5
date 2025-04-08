import { useEffect, useState } from "react";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg"; // mesmo fundo usado na Home

type Livro = {
  id: number;
  titulo: string;
  autorId: number;
  generoId: number;
  comentario: string;
};

type Autor = {
  id: number;
  nome: string;
};

type Genero = {
  id: number;
  nome: string;
};

const Livros = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);

  const [form, setForm] = useState<Omit<Livro, "id">>({
    titulo: "",
    autorId: 0,
    generoId: 0,
    comentario: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const livrosSalvos = JSON.parse(localStorage.getItem("livros") || "[]");
    const autoresSalvos = JSON.parse(localStorage.getItem("autores") || "[]");
    const generosSalvos = JSON.parse(localStorage.getItem("generos") || "[]");

    setLivros(livrosSalvos);
    setAutores(autoresSalvos);
    setGeneros(generosSalvos);
  }, []);

  const salvarLocalStorage = (lista: Livro[]) => {
    localStorage.setItem("livros", JSON.stringify(lista));
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      const atualizados = livros.map((livro) =>
        livro.id === editingId ? { id: editingId, ...form } : livro
      );
      setLivros(atualizados);
      salvarLocalStorage(atualizados);
    } else {
      const novoLivro: Livro = {
        id: Date.now(),
        ...form,
      };
      const atualizados = [...livros, novoLivro];
      setLivros(atualizados);
      salvarLocalStorage(atualizados);
    }

    setForm({ titulo: "", autorId: 0, generoId: 0, comentario: "" });
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (livro: Livro) => {
    setForm({
      titulo: livro.titulo,
      autorId: livro.autorId,
      generoId: livro.generoId,
      comentario: livro.comentario,
    });
    setEditingId(livro.id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    const atualizados = livros.filter((livro) => livro.id !== id);
    setLivros(atualizados);
    salvarLocalStorage(atualizados);
  };

  const getAutorNome = (id: number) =>
    autores.find((a) => a.id === id)?.nome || "";
  const getGeneroNome = (id: number) =>
    generos.find((g) => g.id === id)?.nome || "";

  return (
    <div className="container mx-auto p-4">
      {/* Card Explicativo */}
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg mb-10"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg">
          <h2 className="text-2xl text-black mb-4 font-light">📘 Cadastro de Livros</h2>
          <p className="text-black mb-4 font-light">
            Aqui você pode cadastrar os seus livros favoritos, deixar um comentário sobre a obra, escolher o autor e o gênero correspondente.
          </p>
          <p className="text-black mb-4 font-light">
            Caso o autor ou gênero que você deseja não esteja na lista, vá até o menu do site e acesse as páginas <strong>Autor</strong> e <strong>Gênero</strong> para fazer o cadastro deles antes de retornar aqui.
          </p>
          <p className="text-black font-light">Boa leitura e aproveite a experiência! 📚</p>
        </CardContent>
      </Card>

      {/* Título e botão */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Livros</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Novo Livro</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <h2 className="text-lg font-semibold">
              {editingId ? "Editar Livro" : "Adicionar Livro"}
            </h2>
            <Input
              placeholder="Título"
              value={form.titulo}
              onChange={(e) =>
                setForm({ ...form, titulo: e.target.value })
              }
            />
            <select
              className="w-full p-2 border rounded"
              value={form.autorId}
              onChange={(e) =>
                setForm({ ...form, autorId: Number(e.target.value) })
              }
            >
              <option value={0}>Selecione um autor</option>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.nome}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 border rounded"
              value={form.generoId}
              onChange={(e) =>
                setForm({ ...form, generoId: Number(e.target.value) })
              }
            >
              <option value={0}>Selecione um gênero</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nome}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Comentário sobre o livro"
              value={form.comentario}
              onChange={(e) =>
                setForm({ ...form, comentario: e.target.value })
              }
              className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
            <Button onClick={handleSubmit} className="w-full">
              {editingId ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de livros */}
      {livros.length === 0 ? (
        <p className="text-gray-500">Nenhum livro cadastrado ainda.</p>
      ) : (
        <div className="grid gap-4">
          {livros.map((livro) => (
            <div
              key={livro.id}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{livro.titulo}</h3>
                <p>Autor: {getAutorNome(livro.autorId)}</p>
                <p>Gênero: {getGeneroNome(livro.generoId)}</p>
                {livro.comentario && (
                  <p className="italic text-gray-600 mt-2">
                    💬 {livro.comentario}
                  </p>
                )}
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(livro)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(livro.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Livros;
