import { Router } from "express";
import {
  getAllAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/author", authMiddleware, getAllAuthor);
router.post("/author", authMiddleware, createAuthor);
router.put("/author/:id", authMiddleware, updateAuthor);
router.delete("/author/:id", authMiddleware, deleteAuthor);

export default router;
