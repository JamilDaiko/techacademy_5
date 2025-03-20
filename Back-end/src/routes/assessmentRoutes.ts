import { Router } from "express";
import { getAllAssement } from "../controllers/assessmentController";

const router = Router();

router.get("/", getAllAssement);

export default router;
