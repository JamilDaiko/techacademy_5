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

const API_URL = "http://localhost:3000/categories"; // Altere para a URL da sua API

const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Omit<Categoria, "id">>({ name: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setCategorias(data);
  };

  const handleSubmit = async () => {
    if (editingId !== null) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "" });
    setEditingId(null);
    setOpen(false);
    fetchCategorias();
  };

  const handleEdit = (categoria: Categoria) => {
    setForm({ name: categoria.name });
    setEditingId(categoria.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchCategorias();
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
            <h2 className="text-lg font-semibold">{editingId ? "Editar Categoria" : "Adicionar Categoria"}</h2>
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
                <Button variant="outline" onClick={() => handleEdit(categoria)}>Editar</Button>
                <Button variant="destructive" onClick={() => handleDelete(categoria.id)}>Excluir</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categorias;
