import {
  addSubCategoryService,
  listSubCategoryService,
  updateSubCategoryService,
  deleteSubCategoryService,
} from '../service/subCategoryService';

import { Request,Response } from 'express';

export const addSubCategoryController = async (req: any, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const addSubCategory = await addSubCategoryService(name, userId);

    res.status(201).json({
      success: true,
      message: 'Add sub category successfully',
      data: addSubCategory,
    });
  } catch (error: any) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

export const listSubCategoryController = async(req: Request, res: Response) => {
  try {
    const listSubCategory =await listSubCategoryService();
    res.status(200).json({
      success: true,
      message: 'sub category listed successfully',
      data: listSubCategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSubCategoryController = async (req: any, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const  userId  = req.user.id;

    const updateSubCategory = await updateSubCategoryService(id, data, userId);
    res.status(201).json({
      success: true,
      message: 'sub category updated successfully',
      data: updateSubCategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSubCategoryController = async (req: any, res: Response) => {
  try {
    const {id} = req.params;
    console.log(id)
    await deleteSubCategoryService(id);

    res.status(200).json({
      success: true,
      message: 'Updated origin successfully',
    });
  } catch (error: any) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};
