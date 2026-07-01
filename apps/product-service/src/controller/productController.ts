import {
  addProductService,
  productListService,
  productUpdateService,
  productDeleteService,
} from '../service/productService';
import { Response } from 'express';

export const addProductController = async (req: any, res: Response) => {
  try {
    const { ...data } = req.body;
    const file = req.files;
    const userId = req.user.id;
    const addProduct = await addProductService(file, data, userId);

    res.status(200).json({
      success: true,
      message: 'Product added successfully',
      data: addProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const productListController = async (req: any, res: Response) => {
  try {
    const productList = await productListService();

    res.status(200).json({
      success: true,
      message: 'Product listed successfully',
      data: productList,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProductController = async (req: any, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('Product ID not provide');
    }
    const data = req.body;
    if (!data) {
      throw new Error('Product data not provide');
    }
    const file = req.files;
    const userId = req.user.id;
    if (!userId) {
      throw new Error('Product userId not provide');
    }
    const updateProduct = await productUpdateService(id, file, data, userId);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updateProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};

export const deleteProductController = async (req: any, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id)
    await productDeleteService(id);

    res.status(200).json({
      success: true,
      message: 'Product delete successfully',
    });
  } catch (error: any) {
    res.status(203).json({
      success: false,
      message: 'Product delete faild',
    });
  }
};
