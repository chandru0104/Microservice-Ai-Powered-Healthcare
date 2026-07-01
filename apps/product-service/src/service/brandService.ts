import { BrandModel } from '../model/brandModel';

export const addBrandService = async (name: any, userId: any) => {
  try {
    const brand = await BrandModel.create({ name, createdBy: userId });
    return brand;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const listBrandService = async () => {
  try {
    const brandList = await BrandModel.find({ status: 1 });
    return brandList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateBrandService = async (id: any, data: any, getId: any) => {
  try {
    const payload = {
      ...data,
      updatedBy:getId,
    };
    const updateBrand = await BrandModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return updateBrand;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteBrandService = async (id: any) => {
  try {
    await BrandModel.findByIdAndUpdate(
      id,
      { status: 0 },
      { new: true, runValidators: true },
    );
    return 'Brand deleted successfully';
  } catch (error: any) {
    throw new Error(error.message);
  }
};
