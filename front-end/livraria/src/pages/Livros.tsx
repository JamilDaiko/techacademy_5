import { useEffect, useState } from "react";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg";
import { Star, StarHalf, StarOff } from "lucide-react";

type Livro = {
  id: number;
  titulo: string;
  autorId: number;
  categoriaId: number;
  comentario: string;
  score: number;
  descricao: string;
};

type Autor = {
  id: number;
  nome: string;
};

type Categoria = {
  id: number;
  nome: string;
};

const Livros = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [form, setForm] = useState<Omit<Livro, "id">>({
    titulo: "",
    autorId: 0,
    categoriaId: 0,
    comentario: "",
    score: 0,
    descricao: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const livrosSalvos = JSON.parse(localStorage.getItem("livros") || "[]");
    const autoresSalvos = JSON.parse(localStorage.getItem("autores") || "[]");
    const categoriasSalvas = JSON.parse(localStorage.getItem("categorias") || "[]");

    setLivros(livrosSalvos);
    setAutores(autoresSalvos);
    setCategorias(categoriasSalvas);
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

    setForm({
      titulo: "",
      autorId: 0,
      categoriaId: 0,
      comentario: "",
      score: 0,
      descricao: "",
    });
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (livro: Livro) => {
    setForm({
      titulo: livro.titulo,
      autorId: livro.autorId,
      categoriaId: livro.categoriaId,
      comentario: livro.comentario,
      score: livro.score,
      descricao: livro.descricao,
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

  const getCategoriaNome = (id: number) =>
    categorias.find((c) => c.id === id)?.nome || "";

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score / 2);
    const halfStar = score % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-500 w-5 h-5 inline" fill="currentColor" />);
    }
    if (halfStar) {
      stars.push(<StarHalf key="half" className="text-yellow-500 w-5 h-5 inline" fill="currentColor" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOff key={`empty-${i}`} className="text-gray-400 w-5 h-5 inline" />);
    }

    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg mb-10"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg">
          <h2 className="text-2xl text-black mb-4 font-light">📘 Cadastro de Livros</h2>
          <p className="text-black mb-4 font-light">
            Aqui você pode cadastrar os seus livros favoritos, deixar um comentário sobre a obra, escolher o autor e a categoria correspondente.
          </p>
          <p className="text-black mb-4 font-light">
            Caso o autor ou categoria que você deseja não esteja na lista, vá até o menu do site e acesse as páginas <strong>Autor</strong> e <strong>Categoria</strong> para fazer o cadastro deles antes de retornar aqui.
          </p>
          <p className="text-black font-light">Boa leitura e aproveite a experiência! 📚</p>
        </CardContent>
      </Card>

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
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded"
              value={form.autorId}
              onChange={(e) => setForm({ ...form, autorId: Number(e.target.value) })}
            >
              <option value={0}>Selecione um autor</option>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>{autor.nome}</option>
              ))}
            </select>
            <select
              className="w-full p-2 border rounded"
              value={form.categoriaId}
              onChange={(e) => setForm({ ...form, categoriaId: Number(e.target.value) })}
            >
              <option value={0}>Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
              ))}
            </select>
            <textarea
              placeholder="Comentário sobre o livro"
              value={form.comentario}
              onChange={(e) => setForm({ ...form, comentario: e.target.value })}
              className="w-full border rounded-md p-2 text-sm text-gray-700"
            />
            <Input
              type="number"
              placeholder="Nota (0 a 10)"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
              min={0}
              max={10}
            />
            <textarea
              placeholder="Descrição do livro"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="w-full border rounded-md p-2 text-sm text-gray-700"
            />
            <Button onClick={handleSubmit} className="w-full">
              {editingId ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {livros.length === 0 ? (
        <p className="text-gray-500">Nenhum livro cadastrado ainda.</p>
      ) : (
        <div className="grid gap-4">
          {livros.map((livro) => (
            <div
              key={livro.id}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="text-xl font-semibold">{livro.titulo}</h3>
                <p className="text-gray-800">Autor: <span className="font-medium">{getAutorNome(livro.autorId)}</span></p>
                <p className="text-gray-800">Categoria: <span className="font-medium">{getCategoriaNome(livro.categoriaId)}</span></p>

                {livro.score !== undefined && (
                  <p className="text-gray-700 mt-2 flex items-center gap-2">
                    <span className="text-sm">⭐ Nota:</span>
                    <span className="flex items-center">{renderStars(livro.score)}</span>
                    <span className="text-sm font-semibold ml-1">({livro.score}/10)</span>
                  </p>
                )}

                {livro.descricao && (
                  <p className="text-gray-700 mt-2">📖 {livro.descricao}</p>
                )}
                {livro.comentario && (
                  <p className="italic text-gray-600 mt-2">💬 {livro.comentario}</p>
                )}
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(livro)}>Editar</Button>
                <Button variant="destructive" onClick={() => handleDelete(livro.id)}>Excluir</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Livros;
