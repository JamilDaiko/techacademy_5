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
      return res
        .status(400)
        .json({ error: "Title, description e date são obrigatórios." });
    }

    const newBook = await BookModel.create({
      image,
      title,
      description,
      date_published,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: "Erro ao adicionar o livro." });
  }
};
