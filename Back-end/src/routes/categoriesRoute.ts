import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/categories", getCategories);

router.post("/categories", authMiddleware, createCategory);

router.put("/categories/:id", authMiddleware, updateCategory);

router.delete("/categories/:id", authMiddleware, deleteCategory);

export default router;
