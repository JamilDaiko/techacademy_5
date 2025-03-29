import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token recebido:", token); // <-- Adicione isso para depuração

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token" });
  }

  try {
    const decoded: any = verifyToken(token);
    console.log("Token decodificado:", decoded); // <-- Verifica se decodificou certo
    req.body.user = decoded;
    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error); // <-- Log do erro real
    return res.status(401).json({ error: "Access denied. Invalid token" });
  }
};
