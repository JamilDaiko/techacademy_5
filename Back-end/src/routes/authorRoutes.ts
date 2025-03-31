import { Router } from "express";
import { getAllAuthor } from "../controllers/authorController";

const router = Router();

router.get("/author", getAllAuthor);

export default router;
