import AssessmentModel from "../models/AssessmentModel";
import BookModel from "../models/BookModel";
import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import AuthorsModel from "../models/AuthorsModel";

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
    const { title, description, assessment, authorIds } = req.body;

    if (!title || !description || !authorIds?.length) {
      return res.status(400).json({
        error: "Campos title, description e authorIds são obrigatórios.",
      });
    }

    const newBook = await BookModel.create({ title, description });

    // Relaciona os autores existentes
    await newBook.addAuthors(authorIds);

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

    const fullBook = await BookModel.findByPk(newBook.id, {
      include: [
        {
          model: AuthorsModel,
          as: "authors",
          attributes: ["id", "name"],
        },
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
    const { title, description } = req.body;
    const book = await BookModel.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    await book.update({
      title,
      description,
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
