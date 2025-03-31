import { Request, Response } from "express";
import Category from "../models/CategoriesModel";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", error });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: "Error creating category", error });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update({ name });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: "Error updating category", error });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category", error });
  }
};
