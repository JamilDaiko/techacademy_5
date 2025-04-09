import express from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
  deleteBook,
} from "../controllers/bookControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/books", authMiddleware, getAllBooks); // com paginação
router.get("/books/:id", authMiddleware, getBookById); // busca por ID
router.post("/books/", authMiddleware, addBook);
router.delete("/books/:id", authMiddleware, deleteBook); // deletar livro por ID

export default router;
