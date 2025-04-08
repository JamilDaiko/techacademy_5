import { Request, Response } from "express";
import AuthorsModel from "../models/AuthorsModel";

// método que busca todos
export const getAllAuthor = async (req: Request, res: Response) => {
  const Author = await AuthorsModel.findAll();
  res.send(Author);
};

// método que cria um novo autor
export const createAuthor = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newAuthor = await AuthorsModel.create({ name });
    res.status(201).send(newAuthor);
  } catch (error) {
    res.status(500).send({ error: "Failed to create author" });
  }
};

// método que atualiza um autor existente
export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedAuthor = await AuthorsModel.update(
      { name },
      { where: { id } }
    );
    if (updatedAuthor[0] === 0) {
      res.status(404).send({ error: "Author not found" });
    } else {
      res.send({ message: "Author updated successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update author" });
  }
};

// método que deleta um autor
export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await AuthorsModel.destroy({ where: { id } });
    if (deleted) {
      res.send({ message: "Author deleted successfully" });
    } else {
      res.status(404).send({ error: "Author not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete author" });
  }
};
