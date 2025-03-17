import { Router } from "express";
import { getAllAuthor} from "../controllers/authorController";

const router = Router();

router.get("/", getAllAuthor);

export default router;