import { Request, Response } from "express";
import AssementModel from "../models/AssessmentModel";
import AssessmentModel from "../models/AssessmentModel";

// método que busca todos
export const getAllAssement = async (req: Request, res: Response) => {
  const Assessment = await AssementModel.findAll();
  res.send(Assessment);
};
