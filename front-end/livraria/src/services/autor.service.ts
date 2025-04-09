// src/services/autor.service.ts

const API_URL = "http://localhost:3000/authors";

export const AutorService = {
  listar: async () => {
    const response = await fetch(API_URL);
    return response.json();
  },

  criar: async (autor: { name: string }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(autor),
    });
    return response.json();
  },

  atualizar: async (id: number, autor: { name: string }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(autor),
    });
    return response.json();
  },

  deletar: async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
