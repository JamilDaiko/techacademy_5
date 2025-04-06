import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Altere a porta se necessário

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepta as requisições para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Obtém o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
  }
  return config;
});

export default api;