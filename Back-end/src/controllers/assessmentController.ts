import { Request, Response } from "express";
import AssementModel from "../models/AssessmentModel";
import jwt from "jsonwebtoken";

// método que busca todos
export const getAllAssement = async (req: Request, res: Response) => {
  const Assessment = await AssementModel.findAll();
  res.send(Assessment);
};

// método que adiciona um comentário e nota para um livro por um usuário
export const addComment = async (req: Request, res: Response) => {
  const { bookId, comment, score } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Token não fornecido." });
  }

  try {
    const decoded: any = jwt.verify(token, "seu_segredo_aqui"); // Substitua "seu_segredo_aqui" pelo segredo do seu JWT
    const userId = decoded.id;

    if (!userId || !bookId || !comment || score == null) {
      return res
        .status(400)
        .send({ error: "Todos os campos são obrigatórios." });
    }

    const newEntry = await AssementModel.create({
      userId,
      bookId,
      score,
      comment,
    });
    res.status(201).send(newEntry);
  } catch (error) {
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      return res.status(401).send({ error: "Token inválido." });
    }
    res.status(500).send({ error: "Erro ao adicionar comentário e nota." });
  }
};
