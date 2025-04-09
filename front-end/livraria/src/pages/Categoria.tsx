import { useEffect, useState } from "react";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg";

type Categoria = {
  id: number;
  name: string;
};

const API_URL = "http://localhost:3000/categories";

const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Omit<Categoria, "id">>({ name: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar categorias. Status: ${response.status}`);
      }

      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      setForm({ name: "" });
      setEditingId(null);
      setOpen(false);
      fetchCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setForm({ name: categoria.name });
    setEditingId(categoria.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategorias();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg mb-10"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl text-black mb-4 font-light">🏷️ Cadastro de Categorias</h2>
          <p className="text-black mb-4 font-light">
            Aqui você pode cadastrar as categorias literárias, como Romance, Ficção, Terror, Fantasia, entre outros.
          </p>
          <p className="text-black font-light">
            Depois de cadastrar as categorias, vá até a aba <strong>Livros</strong> e selecione a categoria junto com o autor para concluir o cadastro de cada livro.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Categorias</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Nova Categoria</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <h2 className="text-lg font-semibold">
              {editingId ? "Editar Categoria" : "Adicionar Categoria"}
            </h2>
            <Input
              placeholder="Nome da Categoria"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Button onClick={handleSubmit} className="w-full">
              {editingId ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {categorias.length === 0 ? (
        <p className="text-gray-500">Nenhuma categoria cadastrada ainda.</p>
      ) : (
        <div className="grid gap-4">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{categoria.name}</h3>
                <p className="text-lg text-gray-600 mt-2 italic">
                  ✅ Categoria cadastrada com sucesso! Agora vá até a aba <strong>Livros</strong> e utilize o menu
                  para escolher o autor e essa categoria que você cadastrou. Você também pode deixar um comentário sobre o livro!
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(categoria)}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(categoria.id)}>
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

export default Categorias;
