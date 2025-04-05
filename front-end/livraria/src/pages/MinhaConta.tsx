import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/components/ui/card";
import Input from "../components/components/ui/input";
import { Button } from "../components/components/ui/button";
import api from "../services/api"; // axios com baseURL configurada
import axios from "axios";

const MinhaConta = () => {
  const [form, setForm] = useState({
    name: "Novo Nome",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("O nome completo é obrigatório!");
      return false;
    }
    if (form.password && form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("Usuário não autenticado. Faça login novamente.");
          return;
        }

        const response = await api.put(
          `/users/${userId}`,
          {
            name: form.name,
            password: form.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // envio do token aqui
            },
          }
        );

        setSuccess("Dados atualizados com sucesso!");
        console.log("Dados atualizados:", response.data);
      } catch (error: unknown) {
        console.error("Erro ao atualizar os dados:", error);
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("Erro ao atualizar os dados. Tente novamente.");
        }
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar sua conta? Essa ação não pode ser desfeita.");
    if (confirmDelete) {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("Usuário não autenticado.");
          return;
        }

        const response = await api.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // envio do token aqui também
          },
        });

        if (response.status === 200) {
          setSuccess("Conta deletada com sucesso!");
          console.log("Conta deletada");
          // Aqui você pode redirecionar ou limpar os dados do usuário
        } else {
          setError("Erro ao deletar a conta. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao deletar a conta:", error);
        setError("Erro ao deletar a conta. Tente novamente.");
      }
    }
  };

  return (
    <div className="mx-auto mt-10 rounded-3xl shadow-2xl bg-white w-lg">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Minha Conta</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome Completo"
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <Input
                label="Nova Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-eye" viewBox="0 0 16 16">
                    <path d="..." />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="..." />
                  </svg>
                )}
              </button>
            </div>
            <Button type="submit" className="w-full">
              Atualizar Dados
            </Button>
          </form>

          <h1 className="text-center text-lg font-semibold text-gray-700 my-6">
            Deseja deletar sua conta? Clique no botão abaixo. Essa ação é irreversível.
          </h1>

          <Button
            type="button"
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDeleteAccount}
          >
            Deletar Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinhaConta;
