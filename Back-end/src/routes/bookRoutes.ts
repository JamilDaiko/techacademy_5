import express from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
} from "../controllers/bookControllers";

const router = express.Router();

router.get("/books", getAllBooks); // com paginação
router.get("/books/:id", getBookById); // busca por ID
router.post("/books/addBook", addBook); // novo livro

export default router;
