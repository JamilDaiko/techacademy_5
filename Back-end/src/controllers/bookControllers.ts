import AssessmentModel from "../models/AssessmentModel";
import BookModel from "../models/BookModel";
import { Request, Response } from "express";
import UserModel from "../models/UserModel";

// método que busca todos com paginação
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Converte os parâmetros para números
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      return res
        .status(400)
        .json({ error: "Parâmetros de paginação inválidos." });
    }

    const offset = (pageNumber - 1) * limitNumber;

    // Busca os livros com paginação
    const { rows: books, count: total } = await BookModel.findAndCountAll({
      limit: limitNumber,
      offset,
    });

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: books,
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ error: "Erro interno ao buscar livros." });
  }
};

// método que busca por id
export const getBookById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const book = await BookModel.findByPk(req.params.id, {
    include: [
      {
        association: "assessments",
        include: [
          {
            association: "user",
            attributes: ["id", "name"], // Inclui apenas os campos id e name do usuário
          },
        ],
      },
    ],
  });
  if (!book) {
    return res.status(404).json({ error: "Livro não encontrado" });
  }

  return res.json(book);
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { image, title, description, date_published, assessment } = req.body;

    if (!image || !title || !description || !date_published) {
      return res.status(400).json({
        error:
          "Os campos image, title, description e date_published são obrigatórios.",
      });
    }

    const parsedDate = new Date(date_published);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Formato de data inválido." });
    }

    const newBook = await BookModel.create({
      image,
      title,
      description,
      date_published: parsedDate,
    });

    // Se tiver assessment no corpo da requisição, cria a avaliação
    if (assessment) {
      const { score, comment, userId } = assessment;

      if (typeof score !== "number" || score < 1 || score > 10 || !userId) {
        return res.status(400).json({
          error: "Avaliação inválida. Verifique score (1-10) e userId.",
        });
      }

      await AssessmentModel.create({
        bookId: newBook.id,
        userId,
        score,
        comment,
      });
    }

    // Agora busca o livro completo, com avaliações incluídas
    const fullBook = await BookModel.findByPk(newBook.id, {
      include: [
        {
          model: AssessmentModel,
          as: "assessments",
          include: [
            { model: UserModel, as: "user", attributes: ["id", "name"] },
          ],
        },
      ],
    });

    res.status(201).json(fullBook);
  } catch (error) {
    console.error("Erro ao adicionar o livro:", error);
    res.status(500).json({ error: "Erro interno ao adicionar o livro." });
  }
};

// Atualizar livro
export const updateBook = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { image, title, description, date_published } = req.body;
    const book = await BookModel.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    await book.update({
      image,
      title,
      description,
      date_published: new Date(date_published),
    });

    return res.json(book);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).json({ error: "Erro interno ao atualizar o livro." });
  }
};

// Deletar livro
export const deleteBook = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const book = await BookModel.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    await book.destroy();
    return res.json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    res.status(500).json({ error: "Erro interno ao deletar o livro." });
  }
};
