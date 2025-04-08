import { useEffect, useState } from "react";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg"; // mesmo fundo usado na Home

type Autor = {
  id: number;
  nome: string;
};

const Autores = () => {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [form, setForm] = useState<Omit<Autor, "id">>({ nome: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const autoresSalvos = JSON.parse(localStorage.getItem("autores") || "[]");
    setAutores(autoresSalvos);
  }, []);

  const salvarLocalStorage = (lista: Autor[]) => {
    localStorage.setItem("autores", JSON.stringify(lista));
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      const atualizados = autores.map((autor) =>
        autor.id === editingId ? { id: editingId, ...form } : autor
      );
      setAutores(atualizados);
      salvarLocalStorage(atualizados);
    } else {
      const novoAutor: Autor = {
        id: Date.now(),
        ...form,
      };
      const atualizados = [...autores, novoAutor];
      setAutores(atualizados);
      salvarLocalStorage(atualizados);
    }

    setForm({ nome: "" });
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (autor: Autor) => {
    setForm({ nome: autor.nome });
    setEditingId(autor.id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    const atualizados = autores.filter((autor) => autor.id !== id);
    setAutores(atualizados);
    salvarLocalStorage(atualizados);
  };

  return (
    <div className="container mx-auto p-4">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg mb-10"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl text-black mb-4 font-light">✍️ Cadastro de Autores</h2>
          <p className="text-black mb-4 font-light">
            Nesta seção, você pode cadastrar os autores dos seus livros preferidos. 
            É importante ter o autor registrado para poder associá-lo aos livros na hora do cadastro.
          </p>
          <p className="text-black font-light">
            Depois de adicionar os autores por aqui, vá até a aba <strong>Livros</strong> e selecione o autor correspondente ao cadastrar suas obras.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Lista de Autores</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Novo Autor</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <h2 className="text-lg font-semibold">{editingId ? "Editar Autor" : "Adicionar Autor"}</h2>
            <Input
              placeholder="Nome do Autor"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
            <Button onClick={handleSubmit} className="w-full">
              {editingId ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {autores.length === 0 ? (
        <p className="text-gray-500">Nenhum autor cadastrado ainda.</p>
      ) : (
        <div className="grid gap-4">
          {autores.map((autor) => (
            <div
              key={autor.id}
              className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{autor.nome}</h3>
                <p className="text-lg text-gray-600 mt-2 italic">
                  ✅ Autor cadastrado com sucesso! Agora vá até a aba <strong>Gêneros</strong> e cadastre um gênero. 
                  Depois vá em <strong>Livros</strong> para vincular o autor e gênero, e deixar um comentário!
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(autor)}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(autor.id)}>
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

export default Autores;
