import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Busca o usuário pelo e-mail
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" }); // Mensagem genérica
    }

    // Valida a senha
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" }); // Mensagem genérica
    }

    // Gera o token
    const token = generateToken(user);

    // Retorna sucesso
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
