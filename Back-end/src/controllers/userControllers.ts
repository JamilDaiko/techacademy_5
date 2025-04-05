import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { createUser as createUserService } from "../services/UserService";

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
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

// método que cria um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;
    const user = await createUserService(name, email, password, cpf);
    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
};

// método que atualiza um usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params.id;
    const authenticatedUserId = req.body.user.id; // O ID do usuário autenticado

    if (userId !== authenticatedUserId) {
      return res
        .status(403)
        .json({ error: "Você só pode editar seus próprios dados" });
    }

    const user = await UserModel.findByPk(userId);
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
