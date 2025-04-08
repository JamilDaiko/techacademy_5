import { useEffect, useState } from "react";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg"; // mesmo fundo usado na Home

type Genero = {
  id: number;
  nome: string;
};

const Generos = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [form, setForm] = useState<Omit<Genero, "id">>({ nome: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const generosSalvos = JSON.parse(localStorage.getItem("generos") || "[]");
    setGeneros(generosSalvos);
  }, []);

  const salvarLocalStorage = (lista: Genero[]) => {
    localStorage.setItem("generos", JSON.stringify(lista));
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      const atualizados = generos.map((genero) =>
        genero.id === editingId ? { id: editingId, ...form } : genero
      );
      setGeneros(atualizados);
      salvarLocalStorage(atualizados);
    } else {
      const novoGenero: Genero = {
        id: Date.now(),
        ...form,
      };
      const atualizados = [...generos, novoGenero];
      setGeneros(atualizados);
      salvarLocalStorage(atualizados);
    }

    setForm({ nome: "" });
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (genero: Genero) => {
    setForm({ nome: genero.nome });
    setEditingId(genero.id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    const atualizados = generos.filter((genero) => genero.id !== id);
    setGeneros(atualizados);
    salvarLocalStorage(atualizados);
  };

  return (
    <div className="container mx-auto p-4">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-white border-none rounded-lg mb-10"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 text-center md:text-left rounded-lg  backdrop-blur-sm">
          <h2 className="text-2xl text-black mb-4 font-light">🏷️ Cadastro de Gêneros</h2>
          <p className="text-black mb-4 font-light">
            Aqui você pode cadastrar os gêneros literários, como Romance, Ficção, Terror, Fantasia, entre outros.
          </p>
          <p className="text-black font-light">
            Depois de cadastrar os gêneros, vá até a aba <strong>Livros</strong> e selecione o gênero junto com o autor para concluir o cadastro de cada livro.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Gêneros</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Novo Gênero</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <h2 className="text-lg font-semibold">{editingId ? "Editar Gênero" : "Adicionar Gênero"}</h2>
            <Input
              placeholder="Nome do Gênero"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
            <Button onClick={handleSubmit} className="w-full">
              {editingId ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {generos.length === 0 ? (
        <p className="text-gray-500">Nenhum gênero cadastrado ainda.</p>
      ) : (
        <div className="grid gap-4">
          {generos.map((genero) => (
            <div
              key={genero.id}
              className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{genero.nome}</h3>
                <p className="text-lg text-gray-600 mt-2 italic">
                  ✅ Gênero cadastrado com sucesso! Agora vá até a aba <strong>Livros</strong> e utilize o menu 
                  para escolher o autor e esse gênero que você cadastrou. Você também pode deixar um comentário sobre o livro!
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(genero)}>Editar</Button>
                <Button variant="destructive" onClick={() => handleDelete(genero.id)}>Excluir</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Generos;
