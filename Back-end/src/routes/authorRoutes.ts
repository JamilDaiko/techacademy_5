import { Router } from "express";
import {
  getAllAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";

const router = Router();

router.get("/author", getAllAuthor);
router.post("/author", createAuthor);
router.put("/author/:id", updateAuthor);
router.delete("/author/:id", deleteAuthor);

export default router;
