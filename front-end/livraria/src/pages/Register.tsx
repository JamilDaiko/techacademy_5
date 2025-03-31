import { useState } from "react";
import Input from "../components/components/ui/input"; // Ensure the file exists at 'src/components/Input.tsx' or update the path accordingly
import { validateEmail, validateCPF, validatePassword } from "../utils/validations";

const Register = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !cpf) {
      setError("Todos os campos são obrigatórios!");
      return;
    }
    if (!validateEmail(email)) {
      setError("E-mail inválido!");
      return;
    }
    if (!validateCPF(cpf)) {
      setError("CPF inválido!");
      return;
    }
    if (!validatePassword(password, confirmPassword)) {
      setError("As senhas não coincidem!");
      return;
    }

    setError("");
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="CPF" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input label="Confirmar Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
