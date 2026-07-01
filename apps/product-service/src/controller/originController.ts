import {
  addOrginService,
  listOriginService,
  updateOriginService,
  deleteOriginService,
} from '../service/originService';
import { Request,Response } from 'express';

export const addOrginController = async (req: any, res: Response) => {
      console.log("Controller Hit");
  try { 
    const { name } = req.body;
    const userId = req.user.id;
    console.log(req.user);
  
    const addOrigin = await addOrginService(name, userId);

    res.status(201).json({
      success: true,
      message: 'Add origin successfully',
      data: addOrigin,
    });
  } catch (error: any) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

export const listOriginController = async(req: Request, res: Response) => {
  try {
    const listOrigin =await listOriginService();
    res.status(200).json({
      success: true,
      message: 'Origin listed successfully',
      data: listOrigin,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOriginController = async (req: any, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const  userId  = req.user.id;

    const updateOrigin = await updateOriginService(id, data, userId);
    res.status(201).json({
      success: true,
      message: 'Origin updated successfully',
      data: updateOrigin,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOriginController = async (req: any, res: Response) => {
  try {
    const {id} = req.params;

    await deleteOriginService(id);

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
