import { ChildCategory } from '../model/childCategoryModel';
import { validationError } from '../utils/errorHandler';

export const addChildCategoryService = async (name: string, userId: string) => {
  try {
    const addChild = await ChildCategory.create({ name, createdBy: userId });

    return addChild;
  } catch (error: any) {
    throw new validationError(error.message

    );
  }
};

export const listChildCategoryService = async () => {
  try {
    const listChild = await ChildCategory.find({ status: 1 });

    return listChild;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const updateChildCategoryService = async (id: string, data: any, userId: string) => {
  try {
    const payload = {
     ...data,
      updatedBy: userId,
    };

    console.log(id)
    const updateChild = await ChildCategory.findByIdAndUpdate(
      id,
      payload ,
      { new: true, runValidators: true },
    );
    return updateChild;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const deleteChildCategoryService = async (id: string) => {
  try {
    await ChildCategory.findByIdAndUpdate(
      id,
      { status: 0 },
      { new: true, runValidators: true },
    );
  } catch (error: any) {
    throw new validationError(error.message);
  }
};
