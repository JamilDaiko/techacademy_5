import { Router } from "express";
import { getCategories } from "../controllers/categoriesControllers";

const router = Router();

router.get("/categories", getCategories);

export default router;
