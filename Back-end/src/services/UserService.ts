import UserModel from "../models/UserModel";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { ValidationError } from "sequelize";

// Valida se todos os campos foram preenchidos
const validateFields = (
  name: string,
  email: string,
  password: string,
  cpf: string
) => {
  if (!name || !email || !password || !cpf) {
    throw new Error("Todos os campos são obrigatórios");
  }
};

// Valida o formato do e-mail
export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("E-mail inválido");
  }
};

// Valida a força da senha
export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "A senha deve ter pelo menos 8 caracteres, conter pelo menos uma letra maiúscula, um caractere especial e um número."
    );
  }
};

// Valida o CPF usando biblioteca externa
export const validateCPF = (cpf: string): boolean => {
  const isValid = cpfValidator.isValid(cpf);
  if (!isValid) {
    throw new Error("CPF inválido.");
  }
  return true;
};

// Verifica se já existe um e-mail cadastrado
const checkIfEmailExists = async (email: string) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail já cadastrado");
  }
};

// Serviço principal de criação de usuário
export const createUser = async (
  name: string,
  email: string,
  password: string,
  cpf: string
) => {
  validateFields(name, email, password, cpf);
  validateEmail(email);
  validatePassword(password);
  validateCPF(cpf);
  await checkIfEmailExists(email);

  return await UserModel.create({ name, email, password, cpf });
};
