import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/components/ui/tabs";
import Input from "../components/components/ui/input";
import { validateEmail } from "../utils/validations";
import { maskJs } from "mask-js";
import api from "../services/api";
import axios from "axios";

const Login = () => {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "cpf") {
      const cleanedValue = value.replace(/\D/g, "");
      const formattedValue = maskJs("999.999.999-99", cleanedValue);
      setForm({ ...form, [id]: formattedValue });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (tab === "signup") {
      if (!form.fullName.trim()) {
        setError("O nome completo é obrigatório!");
        return;
      }
      if (!validateEmail(form.email)) {
        setError("E-mail inválido!");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("As senhas não coincidem!");
        return;
      }

      try {
        const response = await api.post("/users", {
          name: form.fullName,
          email: form.email,
          password: form.password,
          cpf: form.cpf.replace(/\D/g, ""),
        });
        setSuccess(response.data.message || "Conta criada com sucesso!");
        setForm({ fullName: "", email: "", password: "", confirmPassword: "", cpf: "" });
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.error || "Erro ao criar conta." : "Erro desconhecido.");
      }
    } else {
      if (!form.email || !form.password) {
        setError("E-mail e senha são obrigatórios!");
        return;
      }
      try {
        await api.post("/login", {
          email: form.email,
          password: form.password,
        });
        alert("Login bem-sucedido!");
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.error || "Erro ao fazer login." : "Erro desconhecido.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-3xl shadow-2xl bg-white">
      <Tabs defaultValue="login" onValueChange={setTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Criar Conta</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          <h2 className="text-2xl font-bold mb-4">{tab === "login" ? "Login" : "Criar Conta"}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            {tab === "signup" && (
              <Input label="Nome Completo" type="text" id="fullName" value={form.fullName} onChange={handleChange} required />
            )}
            <Input label="E-mail" type="email" id="email" value={form.email} onChange={handleChange} required />
            <Input label="CPF" type="text" id="cpf" value={form.cpf} onChange={handleChange} required />
            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 transform translate-y-1 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {tab === "signup" && (
              <Input
                label="Confirmar Senha"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
            <button type="submit" className="bg-black text-white py-2 px-4 rounded mt-4 w-full">
              {tab === "login" ? "Entrar" : "Criar Conta"}
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;