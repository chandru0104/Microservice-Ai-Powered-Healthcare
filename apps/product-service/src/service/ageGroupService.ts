import { AgeGroup } from '../model/ageGroupModel';
import { validationError } from '../utils/errorHandler';

export const addAgeGroupService = async (name: any, userId: any) => {
  try {
    const addAgeGroup = await AgeGroup.create({ name, createdBy: userId });

    if (!addAgeGroup) {
      throw new validationError('Please fill the require fields');
    }

    return addAgeGroup;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const listAgeGroupService = async () => {
  try {
    const listAgeGroup = await AgeGroup.find({ status: 1 });

    return listAgeGroup;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const updateGroupService = async (id: any, data: any, userId: any) => {
  try {
    const payload = {
        ...data,
         UpdatedBy: userId,
    }
    const updateGroup = await AgeGroup.findByIdAndUpdate(
      id,payload,
      { new: true, runValidators: true },
    );

    return updateGroup;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const deleteAgeGroupService = async (id: any) => {
  try {
    const deleteAgeGroup = await AgeGroup.findByIdAndUpdate(id, { status: 0 });
    return deleteAgeGroup;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};
