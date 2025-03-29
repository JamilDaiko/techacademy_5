import express from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
} from "../controllers/bookControllers";

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.post("/books/addBook", addBook);

export default router;
