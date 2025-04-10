import { useEffect, useState } from "react";
import axios from "axios";
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
  title: string;
  authorIds: number[];
  categoryIds: number[];
  comment: string;
  score: number;
  description: string;
};

type Autor = {
  id: number;
  name: string;
};

type Categoria = {
  id: number;
  name: string;
};

const Livros = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Omit<Livro, "id">>({
    title: "",
    authorIds: [],
    categoryIds: [],
    comment: "",
    score: 0,
    description: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const API = "http://localhost:3000";

  useEffect(() => {
    fetchLivros();
    fetchAutores();
    fetchCategorias();
  }, []);

  const fetchLivros = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLivros(res.data.data);
    } catch (error) {
      console.error(
        "Erro ao buscar livros:",
        error.response?.data || error.message
      );
      setLivros([]);
    }
  };

  const fetchAutores = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token não encontrado no localStorage");
      return;
    }
  
    try {
      const res = await axios.get(`${API}/author`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (Array.isArray(res.data)) {
        setAutores(res.data);
      } else {
        console.error("Resposta inesperada:", res.data);
        setAutores([]);
      }
  
    } catch (error) {
      console.error(
        "Erro ao buscar autores:",
        error.response?.data || error.message
      );
      setAutores([]); 
    }
  };
  
  

  const fetchCategorias = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(res.data);
    } catch (error) {
      console.error(
        "Erro ao buscar categorias:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log("Dados enviados:", form);

    try {
      if (editingId !== null) {
        await axios.put(`${API}/books/${editingId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${API}/books`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchLivros();
      resetForm();
      setOpen(false);
    } catch (error: any) {
      console.error(
        "Erro ao salvar livro:",
        error.response?.data || error.message
      );
      alert(
        "Erro ao salvar livro: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleEdit = (livro: Livro) => {
    setForm({
      title: livro.title,
      authorIds: livro.authorIds,
      categoryIds: livro.categoryIds,
      comment: livro.comment,
      score: livro.score,
      description: livro.description,
    });
    setEditingId(livro.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchLivros();
    } catch (error) {
      console.error(
        "Erro ao deletar livro:",
        error.response?.data || error.message
      );
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      authorIds: [],
      categoryIds: [],
      comment: "",
      score: 0,
      description: "",
    });
    setEditingId(null);
  };

  const getAutorNomes = (authors: { id: number; name: string }[]) => {
    if (!Array.isArray(authors)) return "";
    return authors.map((a) => a.name).join(", ");
  };

  const getCategoriaNomes = (categories: { id: number; name: string }[]) => {
    if (!Array.isArray(categories)) return "";
    return categories.map((c) => c.name).join(", ");
  };

  const renderStars = (score: number) => {
    if (typeof score !== 'number' || isNaN(score)) return null;

    const fullStars = Math.floor(score / 2);
    const halfStar = score % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="text-yellow-500 w-5 h-5 inline"
          fill="currentColor"
        />
      );
    }
    if (halfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="text-yellow-500 w-5 h-5 inline"
          fill="currentColor"
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOff key={`empty-${i}`} className="text-gray-400 w-5 h-5 inline" />
      );
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
          <h2 className="text-2xl text-black mb-4 font-light">
            📘 Cadastro de Livros
          </h2>
          <p className="text-black mb-4 font-light">
            Cadastre livros, comente, avalie e relacione com autor e categoria!
          </p>
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
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded text-black"
              value={form.authorIds?.[0] || ""}
              onChange={(e) =>
                setForm({ ...form, authorIds: [Number(e.target.value)] })
              }
            >
              <option value="">Selecione um autor</option>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded text-black"
              value={form.categoryIds?.[0] ?? ""}
              onChange={(e) =>
                setForm({ ...form, categoryIds: [Number(e.target.value)] })
              }
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Comentário sobre o livro"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full border rounded-md p-2 text-sm text-gray-700"
            />
            <Input
              type="number"
              placeholder="Nota (0 a 10)"
              value={form.score}
              onChange={(e) =>
                setForm({ ...form, score: Number(e.target.value) })
              }
              min={0}
              max={10}
            />
            <textarea
              placeholder="Descrição do livro"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
                <h3 className="text-xl font-semibold">{livro.title}</h3>
                <p className="text-gray-800">
                  Autor(es):{" "}
                  <span className="font-medium">
                    {getAutorNomes(livro.authors)}
                  </span>
                </p>
                <p className="text-gray-800">
                  Categoria(s):{" "}
                  <span className="font-medium">
                    {getCategoriaNomes(livro.categories)}
                  </span>
                </p>
                <p className="text-gray-700 mt-2 flex items-center gap-2">
                  <span className="text-sm">⭐ Nota:</span>
                  <span className="flex items-center">
                    {renderStars(livro.score)}
                  </span>
                  <span className="text-sm font-semibold ml-1">
                    ({livro.score}/10)
                  </span>
                </p>
                {livro.description && (
                  <p className="text-gray-700 mt-2">📖 {livro.description}</p>
                )}
                {livro.comment && (
                  <p className="italic text-gray-600 mt-2">
                    💬 {livro.comment}
                  </p>
                )}
              </div>
              <div className="space-x-2">
                <Button onClick={() => handleEdit(livro)} variant="outline">
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(livro.id)}
                  variant="destructive"
                >
                  Deletar
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
