import {
  addAgeGroupService,
  listAgeGroupService,
  updateGroupService,
  deleteAgeGroupService,
} from '../service/ageGroupService';
import { Request, Response } from 'express';
import { validationError } from '../utils/errorHandler';

export const addAgeGroupController = async (req: any, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name) {
      throw new validationError('Fill the require field');
    }
    const addAgeGroup = await addAgeGroupService(name, userId);

    res.status(201).json({
      success: true,
      message: 'Age group added successfully',
      data: addAgeGroup,
    });
  } catch (error: any) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

export const listAgeGroupController = async (req: Request, res: Response) => {
  try {
    const listAgeGroup = await listAgeGroupService();

    res.status(200).json({
      success: true,
      message: 'Age group listed successfully',
      data: listAgeGroup,
    });
  } catch (error: any) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAgeGroupController = async (req: any, res: Response) => {
  try {
    const  {id}  = req.params;
    const data = req.body;
    const userId = req.user.id;

  console.log(data,userId)
    const updateAgeGroup = await updateGroupService(id, data, userId);

    res.status(201).json({
      success: true,
      message: 'Age group updated successfully',
      data: updateAgeGroup,
    });
  } catch (error: any) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAgeGroupController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteAgeGroupService(id);

    res.status(200).json({
      success: false,
      message: 'Age group deleted successfully',
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
