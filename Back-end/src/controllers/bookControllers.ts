import BookModel from "../models/BookModel";
import { Request, Response } from "express";

// método que busca todos
export const getAllBooks = async (req: Request, res: Response) => {
  const books = await BookModel.findAll();
  res.send(books);
};

// método que busca por id
export const getBookById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const book = await BookModel.findByPk(req.params.id);

  return res.json(book);
};

// método que adiciona um livro
export const addBook = async (req: Request, res: Response) => {
  try {
    const { image, title, description, date_published } = req.body;

    if (!image || !title || !description || !date_published) {
      return res.status(400).json({
        error:
          "Os campos image, title, description e date_published são obrigatórios.",
      });
    }

    // Garantir que a data está no formato correto
    const parsedDate = new Date(date_published);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Formato de data inválido." });
    }

    const newBook = await BookModel.create({
      image,
      title,
      description,
      date_published: parsedDate,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Erro ao adicionar o livro:", error);
    res.status(500).json({ error: "Erro interno ao adicionar o livro." });
  }
};
