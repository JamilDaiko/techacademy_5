import express from "express";
import { getAllBooks, getBookById } from "../controllers/bookControllers";

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);

export default router;
