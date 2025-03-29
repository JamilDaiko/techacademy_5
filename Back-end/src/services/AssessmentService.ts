import jwt from "jsonwebtoken";
import AssessmentModel from "../models/AssessmentModel";

/**
 * Valida o token JWT e extrai o userId
 */
const validateTokenAndGetUserId = (token: string) => {
  try {
    // Verifica e decodifica o token JWT
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    );
    return decoded.user.id; // Retorna o userId do payload do token
  } catch (error) {
    throw { status: 401, message: "Token inválido." }; // Se o token for inválido
  }
};

/**
 * Valida os dados do comentário e da nota
 */
const validateCommentData = (
  bookId: string,
  comment: string,
  score: number
) => {
  // Verifica se todos os campos são fornecidos
  if (!bookId || !comment || score == null) {
    throw { status: 400, message: "Todos os campos são obrigatórios." };
  }

  // Valida a pontuação (deve ser um número entre 0 e 5)
  if (typeof score !== "number" || score < 0 || score > 5) {
    throw { status: 400, message: "A pontuação deve estar entre 0 e 5." };
  }

  // Valida o comentário (deve ser uma string não vazia e com no máximo 500 caracteres)
  if (
    typeof comment !== "string" ||
    comment.trim() === "" ||
    comment.length > 500
  ) {
    throw { status: 400, message: "Comentário inválido ou muito longo." };
  }
};

/**
 * Função principal que faz a criação do comentário no banco de dados
 */
export const addCommentService = async (
  token: string,
  bookId: string,
  comment: string,
  score: number
) => {
  // Valida o token e extrai o userId
  const userId = validateTokenAndGetUserId(token);

  // Valida os dados de comentário
  validateCommentData(bookId, comment, score);

  try {
    // Cria a entrada de avaliação (comentário e nota)
    const newEntry = await AssessmentModel.create({
      userId,
      bookId,
      score,
      comment,
    });

    return newEntry; // Retorna a nova entrada criada
  } catch (error) {
    throw {
      status: 500,
      message: "Erro ao processar sua solicitação. Tente novamente mais tarde.",
    };
  }
};
