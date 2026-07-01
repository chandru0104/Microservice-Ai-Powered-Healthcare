import { OriginModel } from '../model/originModel';
import { validationError } from '../utils/errorHandler';

export const addOrginService = async (name: any, userId: any) => {
  try {
    const addOrigin = await OriginModel.create({ name, createdBy: userId });
    return addOrigin;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const listOriginService = async () => {
  try {
    const listOrigin = await OriginModel.find({status:1});
    return listOrigin;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const updateOriginService = async (id: any, data: any, userId: any) => {
  try {
    const payload = {
      ...data,
      updatedBy: userId,
    };
    console.log(payload)
    const updateOrigin = await OriginModel.findByIdAndUpdate(id, payload, {
      new: true,
      newValidator: true,
    });

    return updateOrigin;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const deleteOriginService = async (id: any) => {
  try {
    await OriginModel.findByIdAndUpdate(
      id,
      { status: 0 },
      { new: true, newValidator: true },
    );
  } catch (error: any) {
    throw new validationError(error.message);
  }
};
