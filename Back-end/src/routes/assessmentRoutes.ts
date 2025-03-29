import { Router } from "express";
import {
  getAllAssement,
  addComment,
} from "../controllers/assessmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/assement", getAllAssement);
router.post("/books/:id/assement/addComent", authMiddleware, addComment);

export default router;
