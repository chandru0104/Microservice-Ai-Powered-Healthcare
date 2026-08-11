import { SubCategory } from '../model/subCategoryModel';
import { validationError } from '../utils/errorHandler';

export const addSubCategoryService = async (name: string, userId: string) => {
  try {
    const addSubCategory = await SubCategory.create({ name, createdBy: userId });
    return addSubCategory;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const listSubCategoryService = async () => {
  try {
    const listSubCategory = await SubCategory.find({status:1});
    return listSubCategory;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const updateSubCategoryService = async (id: string, data: any, userId: string) => {
  try {
    const payload = {
      ...data,
      updatedBy: userId,
    };

    const updateSubCategory= await SubCategory.findByIdAndUpdate(id, payload, {
      new: true,
      newValidator: true,
    });

    return updateSubCategory;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const deleteSubCategoryService = async (id: string) => {
  try {
    await SubCategory.findByIdAndUpdate(
      id,
      { status: 0 },
      { new: true, newValidator: true },
    );
  } catch (error: any) {
    throw new validationError(error.message);
  }
};
