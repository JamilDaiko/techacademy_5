import { Request, Response } from "express";
import AssementModel from "../models/AssessmentModel";
import { addCommentService } from "../services/AssessmentService";

// método que busca todos
export const getAllAssement = async (req: Request, res: Response) => {
  const Assessment = await AssementModel.findAll();
  res.send(Assessment);
};

export const addComment = async (req: Request, res: Response) => {
  const { bookId, comment, score } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const newEntry = await addCommentService(token, bookId, comment, score);
    return res.status(201).json(newEntry);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status((error as any).status || 500)
        .json({ error: error.message });
    }
    return res.status(500).json({ error: "An unknown error occurred." });
  }
};
