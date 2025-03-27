import { Router } from "express";
import {
  getAllAssement,
  addComment,
} from "../controllers/assessmentController";

const router = Router();

router.get("/assement", getAllAssement);
router.post("/assement/addComent", addComment);

export default router;
