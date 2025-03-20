import { Request, Response } from "express";
import UserModel from "../models/UserModel";

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

// método que busca por id
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);

  return res.json(user);
};

// método que cria um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (
      !name ||
      name === "" ||
      !email ||
      email === "" ||
      !password ||
      password === "" ||
      !cpf ||
      cpf === ""
    ) {
      return res
        .status(400)
        .json({ error: "Name, email, password, and cpf are required" });
    }

    const user = await UserModel.create({ name, email, password, cpf });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que atualiza um usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password, cpf } = req.body;

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name && name !== "") {
      user.name = name;
    }
    if (email && email !== "") {
      user.email = email;
    }
    if (password && password !== "") {
      user.password = password;
    }
    if (cpf && cpf !== "") {
      user.cpf = cpf;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que destrói
export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
