import { CategoryModel } from '../model/categoryModel';
import {validationError} from "../utils/errorHandler"

export const categoryAddService = async (name: any, userId: any) => {
  try {
    const createCategory = await CategoryModel.create({
      name,
      createdBy: userId,
    });

    return createCategory;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const categoryListService = async () => {
  try {
    const categoryList = await CategoryModel.find({ status: 1 });

    return categoryList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const categoryUpdateService = async (id: any, data: any,getId:any) => {
  try {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new validationError('Category not found');
    }

    const payload = { ...data, updatedBy: getId };

    const update = await CategoryModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });


    return update;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const categoryDeleteService =async (id:any)=>{
  try{
      const category = await CategoryModel.findById(id)

    if (!category) {
      throw new validationError('Category not found');
    }

    const deleteCategory = await CategoryModel.findByIdAndUpdate(id,{status:0},{new:true,runValidators:true})

    return deleteCategory
  }catch(error:any){
     throw new Error(error.message)
  }
}
