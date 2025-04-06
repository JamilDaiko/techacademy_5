import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "../services/api"; // Certifique-se de que o serviço de API está configurado

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userName: string | null; // Adicionado para armazenar o nome do usuário
  fetchUserName: () => Promise<void>; // Função para buscar o nome do usuário
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // Estado para o nome do usuário

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId"); // limpa o userId também, se você salvar ele
    setToken(null);
    setUserName(null); // Limpa o nome do usuário ao deslogar
  };

  const fetchUserName = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.name); // Atualiza o estado com o nome do usuário
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
        userName,
        fetchUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar dentro do AuthProvider");
  return context;
};
