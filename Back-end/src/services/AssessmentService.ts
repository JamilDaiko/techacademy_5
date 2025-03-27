import jwt from "jsonwebtoken";
import AssessmentModel from "../models/AssessmentModel";

/**
 * Validação do token e extração do userId
 */
const validateTokenAndGetUserId = (token: string) => {
  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    );
    return decoded.user.id;
  } catch (error) {
    throw { status: 401, message: "Token inválido." };
  }
};

/**
 * Valida se os dados de comentário e nota são corretos
 */
const validateCommentData = (
  bookId: string,
  comment: string,
  score: number
) => {
  if (!bookId || !comment || score == null) {
    throw { status: 400, message: "Todos os campos são obrigatórios." };
  }

  if (typeof score !== "number" || score < 0 || score > 5) {
    throw { status: 400, message: "A pontuação deve estar entre 0 e 5." };
  }

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
  const userId = validateTokenAndGetUserId(token);
  validateCommentData(bookId, comment, score);

  // Cria a entrada de avaliação
  const newEntry = await AssessmentModel.create({
    userId,
    bookId,
    score,
    comment,
  });

  return newEntry;
};
