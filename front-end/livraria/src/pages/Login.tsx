import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/components/ui/tabs";
import Input from "../components/components/ui/input"; // Certifique-se de que esse caminho está correto
import { validateEmail } from "../utils/validations";

const Login = () => {
  const [tab, setTab] = useState("login"); // Alterna entre login e cadastro
  const [form, setForm] = useState({ 
    fullName: "", email: "", password: "", confirmPassword: "", cpf: "" 
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Controla a visibilidade da senha

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Verifica se o campo sendo alterado é o CPF
    if (id === "cpf") {
      // Remove tudo que não for número
      const cleanedValue = value.replace(/\D/g, "");
      
      // Aplica a formatação do CPF (XXX.XXX.XXX-XX)
      const formattedValue = cleanedValue
        .replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, (_, part1, part2, part3, part4) => {
          if (part4) {
            return `${part1}.${part2}.${part3}-${part4}`;
          } else if (part3) {
            return `${part1}.${part2}.${part3}`;
          } else if (part2) {
            return `${part1}.${part2}`;
          } else {
            return part1;
          }
        });
        
      setForm({ ...form, [id]: formattedValue });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const validateFullName = (name: string) => {
    return /^[A-Za-zÀ-ÿ\s]+$/.test(name); // Permite apenas letras e espaços
  };

  const validateCPFInput = (cpf: string) => {
    return /^\d{11}$/.test(cpf); // Permite apenas números e deve ter exatamente 11 dígitos
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tab === "signup") {
      if (!form.fullName.trim()) {
        setError("O nome completo é obrigatório!");
        return;
      }
      if (!validateFullName(form.fullName)) {
        setError("O nome não pode conter números ou caracteres especiais!");
        return;
      }
    }

    if (!form.email || !form.password) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("E-mail inválido!");
      return;
    }

    if (!validateCPFInput(form.cpf.replace(/\D/g, ""))) { // Remove a formatação antes de validar
      setError("CPF inválido! Deve conter apenas números e ter 11 dígitos.");
      return;
    }

    if (tab === "signup" && form.password !== form.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    setError("");
    alert(tab === "login" ? "Login bem-sucedido!" : "Conta criada com sucesso!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-3xl shadow-2xl bg-white">
      <Tabs defaultValue="login" onValueChange={(value) => setTab(value)}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Criar Conta</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p className="text-gray-600 mb-4">
            Já tem uma conta? Faça login abaixo. Se você ainda não tem uma, clique no botão ao lado para criar sua conta.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <Input label="E-mail" type="email" id="email" value={form.email} onChange={handleChange} required />
            <Input label="CPF" type="text" id="cpf" value={form.cpf} onChange={handleChange} required />
            
            {/* Senha com visibilidade alternável */}
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
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className="bg-black text-white py-2 px-4 rounded mt-4 w-full">Entrar</button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
          <p className="text-gray-600 mb-4">
            Preencha os detalhes abaixo para criar uma nova conta. Se já tem uma conta, clique no botão ao lado para fazer login.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <Input label="Nome Completo" type="text" id="fullName" value={form.fullName} onChange={handleChange} required />
            <Input label="E-mail" type="email" id="email" value={form.email} onChange={handleChange} required />
            <Input label="CPF" type="text" id="cpf" value={form.cpf} onChange={handleChange} required />
            
            {/* Senha com visibilidade alternável */}
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
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Confirmar Senha */}
            <div className="relative">
              <Input 
                label="Confirmar Senha" 
                type={showPassword ? "text" : "password"} 
                id="confirmPassword" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="absolute right-3 top-9 transform translate-y-1 flex items-center"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className="bg-black text-white py-2 px-4 rounded mt-4 w-full">Criar Conta</button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
