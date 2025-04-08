// src/services/categoriaService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/categories"; // ajuste se sua rota for diferente

export const getCategorias = () => axios.get(API_URL);
export const createCategoria = (nome: string) => axios.post(API_URL, { name: nome });
export const updateCategoria = (id: number, nome: string) => axios.put(`${API_URL}/${id}`, { name: nome });
export const deleteCategoria = (id: number) => axios.delete(`${API_URL}/${id}`);
