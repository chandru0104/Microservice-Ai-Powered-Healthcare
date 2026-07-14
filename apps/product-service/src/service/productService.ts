import { Product } from '../model/productModel';
import { SubCategory } from '../model/subCategoryModel';
import { AgeGroup } from '../model/ageGroupModel';
import { BrandModel } from '../model/brandModel';
import { CategoryModel } from '../model/categoryModel';
import { OriginModel } from '../model/originModel';
import { ChildCategory } from '../model/childCategoryModel';
import { validationError } from '../utils/errorHandler';
import cloudinary from '../utils/cloudinary';

export const addProductService = async (file: any, data: any, userId: any) => {
  try {
    let {
      name,
      description,
      price,
      expiryOn,
      benefit,
      variant,
      subcategoryId,
      categoryId,
      childCategoryId,
      originId,
      brandId,
      ageGroupId,
      returnPolicy,
    } = data;

    const subCategoryName = await SubCategory.findById(subcategoryId);

    if (!subCategoryName) {
      throw new validationError('Subcategory not found');
    }
    const subCategory = subCategoryName.name;

    const categoryName = await CategoryModel.findById(categoryId);

    if (!categoryName) {
      throw new validationError('Category not found');
    }
    const category = categoryName.name;

    const childCategoryName = await ChildCategory.findById(childCategoryId);

    if (!childCategoryName) {
      throw new validationError('Child category not found');
    }
    const childCategory = childCategoryName.name;

    const originName = await OriginModel.findById(originId);

    if (!originName) {
      throw new validationError('Origin not found');
    }
    const origin = originName.name;

    const brandName = await BrandModel.findById(brandId);

    if (!brandName) {
      throw new validationError('Brand not found');
    }
    const brand = brandName.name;

    const ageGroupName = await AgeGroup.findById(ageGroupId);

    if (!ageGroupName) {
      throw new validationError('Age group not found');
    }
    const ageGroup = ageGroupName.name;

    let productImage: string[] = [];

    if (file && Array.isArray(file)) {
      for (const f of file) {
        if (f.path) {
          const image = await cloudinary.uploader.upload(f.path, {
            folder: 'product-images',
          });
          productImage.push(image.secure_url);
        }
      }
    } else if (file && file.path) {
      const image = await cloudinary.uploader.upload(file.path, {
        folder: 'product-images',
      });
      productImage.push(image.secure_url);
    }

    await Product.create({
      name,
      description,
      price,
      expiryOn,
      benefit,
      image: productImage,
      variant,
      subcategoryId,
      categoryId,
      childCategoryId,
      originId,
      brandId,
      ageGroupId,
      returnPolicy,
      createdBy: userId,
    });

    const productResponse = {
      name,
      description,
      price,
      expiryOn,
      benefit,
      image: productImage,
      variant,
      subCategory,
      subcategoryId,
      category,
      categoryId,
      childCategory,
      origin,
      originId,
      brand,
      brandId,
      ageGroup,
      ageGroupId,
      returnPolicy,
      createdBy: userId,
    };

    return productResponse;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

export const productListService = async (page: number, limit: number) => {
  try {
    const pages = (page - 1) * limit
    const productData = await Product.find({ status: 1 }).skip(pages).limit(limit);
    return productData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const productUpdateService = async (id: any, file: any, data: any, userId: any) => {
  try {
    const images: string[] = []

    if (file && Array.isArray(file)) {
      for (const f of file) {
        if (f.path) {
          const image = await cloudinary.uploader.upload(f.path, {
            folder: "product-images"
          })
          images.push(image.secure_url)
        }

      }

    } else if (file.path) {
      const image = await cloudinary.uploader.upload(file.path, {
        folder: "product-images"
      })
      images.push(image.secure_url)
    }

    const payload = {
      ...data,
      updatedBy: userId,
    };

    if (images.length > 0) {
      payload.image = images
    }

    const updatePorduct = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return updatePorduct;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const productDeleteService = async (id: any) => {
  try {

    await Product.findByIdAndUpdate(id, { status: 0 })

  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const viewProductService = async (id: any) => {
  try {

    const viewProduct = await Product.findById(id)

    return viewProduct

  } catch (error: any) {
    throw new Error(error.message)
  }
}