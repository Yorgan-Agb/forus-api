import { Category } from '../models/category.model.js';
import { StatusCodes } from 'http-status-codes';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({ category_name });
    res.status(StatusCodes.CREATED).json(newCategory);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
