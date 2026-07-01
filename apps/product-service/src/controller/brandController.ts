import {
  addBrandService,
  listBrandService,
  updateBrandService,
  deleteBrandService,
} from '../service/brandService';
import { Request, Response } from 'express';
import {validationError} from "../utils/errorHandler"

export const addBrandController = async (req: any, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user?.id;

    if (!name) {
      throw new validationError('Please fill the Brand name');
    }

    const addBrand = await addBrandService(name, userId);
    res.status(201).json({
      success: true,
      message: 'Brand added successfully',
      data: addBrand,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const listBrandController = async (req: Request, res: Response) => {
  try {
    const listBrand = await listBrandService();
    res.status(200).json({
      success: true,
      message: 'Brand listed successfully',
      data: listBrand,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBrandController = async (req: any, res: Response) => {
  try {
    const {id} = req.params;
    const data  = req.body;
    const getId = req.user.id;

    const updateBrand = await updateBrandService(id, data, getId);
    res.status(200).json({
      success: true,
      message: 'Brand listed successfully',
      data: updateBrand,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBrandController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    await deleteBrandService(id);

    res.status(200).json({
      success: true,
      message: 'Brand Deleted successfully',
    });
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};
