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
