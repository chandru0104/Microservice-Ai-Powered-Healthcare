import {
  categoryAddService,
  categoryListService,
  categoryUpdateService,
  categoryDeleteService,
} from '../service/categoryService';
import { Request, Response } from 'express';
import {validationError} from "../utils/errorHandler"

export const categoryAddController = async (req: any, res: Response) => {
  try {
    const { name } = req.body;
    const getUserId = req.user?.id;

    if (!name) {
      throw new validationError('Fill the category name');
    }
    const categoryData = await categoryAddService(name, getUserId);

    res.status(201).json({
      success: true,
      message: 'Create Category',
      data: categoryData,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const serviceListController = async (req: Request, res: Response) => {
  try {
    const getServiceList = await categoryListService();

    res.status(200).json({
      success: true,
      message: 'Service Listed Sucsessfully',
      data: getServiceList,
    });
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};

export const categoryUpdateController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const getId = req.user?.id;

    if (!id) {
      throw new Error('Category id not found');
    }

    const updateCategory = await categoryUpdateService(id, data, getId);

    res.status(201).json({
      success: true,
      message: 'Category updated successfully',
      data: updateCategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const categoryDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error('Category id not found');
    }

    await categoryDeleteService(id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
