import {
  addChildCategoryService,
  listChildCategoryService,
  updateChildCategoryService,
  deleteChildCategoryService,
} from '../service/childCategoryService';
import { Response } from 'express';
import { validationError } from '../utils/errorHandler';

export const addChildCategoryController = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    if (!name) {
      throw new validationError('Please fill require field');
    }
    const addChilds = await addChildCategoryService(name, userId);

    res.status(201).json({
      success: true,
      message: 'Add child category successfully',
      data: addChilds,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const listChildCategoryController = async (req: any, res: Response) => {
  try {
    const listChildCategorys = await listChildCategoryService();

    res.status(200).json({
      success: true,
      message: 'Listed child category successfully',
      data: listChildCategorys,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateChildCategoryController = async (
  req: any,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const  name  = req.body;
    const userId = req.user.id;

    const updateChildCategory = await updateChildCategoryService(
      id,
      name,
      userId,
    );

    res.status(201).json({
      success: true,
      message: 'Updated child category',
      data: updateChildCategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteChildCategoryController = async (
  req: any,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new validationError('Child category not found');
    }

    await deleteChildCategoryService(id);

    res.status(200).json({
      success: true,
      message: 'Child category updated successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
