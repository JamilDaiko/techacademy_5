import UserModel from "../models/UserModel";

/**
 * Valida se todos os campos obrigatórios foram fornecidos.
 */
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

/**
 * Valida se a senha atende aos requisitos mínimos.
 */
const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "A senha deve ter pelo menos 8 caracteres, conter pelo menos uma letra maiúscula, um caractere especial e um número."
    );
  }
};

/**
 * Valida se o CPF tem o formato correto (11 números).
 */
const validateCPF = (cpf: string) => {
  const cpfRegex = /^\d{11}$/;

  if (!cpfRegex.test(cpf)) {
    throw new Error("CPF inválido. Deve conter 11 dígitos numéricos.");
  }
};

/**
 * Verifica se um e-mail já está cadastrado no banco.
 */
const checkIfEmailExists = async (email: string) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail já cadastrado");
  }
};

/**
 * Cria um novo usuário após todas as validações.
 */
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

  // Criar usuário no banco
  return await UserModel.create({ name, email, password, cpf });
};
