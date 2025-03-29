import UserModel from "../models/UserModel";

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

const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "A senha deve ter pelo menos 8 caracteres, conter pelo menos uma letra maiúscula, um caractere especial e um número."
    );
  }
};

const validateCPF = (cpf: string) => {
  const cpfRegex = /^\d{11}$/;

  if (!cpfRegex.test(cpf)) {
    throw new Error("CPF inválido. Deve conter 11 dígitos numéricos.");
  }
};

const checkIfEmailExists = async (email: string) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail já cadastrado");
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  cpf: string
) => {
  validateFields(name, email, password, cpf);
  validatePassword(password);
  validateCPF(cpf);
  await checkIfEmailExists(email);

  return await UserModel.create({ name, email, password, cpf });
};
