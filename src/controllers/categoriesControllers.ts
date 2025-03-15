import { Request, Response } from 'express';
import Category from '../models/CategoriesModel';


export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching categories', error });
    }
};