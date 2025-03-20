import { Request, Response } from "express";
import AuthorsModel from "../models/AuthorsModel";

// método que busca todos
export const getAllAuthor = async (req: Request, res: Response) => {
  const Author = await AuthorsModel.findAll();
  res.send(Author);
};
