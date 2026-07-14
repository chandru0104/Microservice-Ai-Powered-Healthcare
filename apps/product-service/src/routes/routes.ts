import express from 'express';
import {
  categoryAddController,
  serviceListController,
  categoryUpdateController,
  categoryDeleteController,
} from '../controller/categoryController';

import {
  addBrandController,
  listBrandController,
  updateBrandController,
  deleteBrandController,
} from '../controller/brandController';

import {
  addAgeGroupController,
  listAgeGroupController,
  updateAgeGroupController,
  deleteAgeGroupController,
} from '../controller/ageGroupController';

import {
  addChildCategoryController,
  listChildCategoryController,
  updateChildCategoryController,
  deleteChildCategoryController,
} from '../controller/childCategoryController';

import {
  addOrginController,
  updateOriginController,
  listOriginController,
  deleteOriginController,
} from '../controller/originController';

import {
  addSubCategoryController,
  listSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
} from '../controller/subCategoryController';

import {
  addProductController,
  productListController,
  updateProductController,
  deleteProductController,
  viewProductController
} from '../controller/productController';

import { authMiddleware } from '../middleware/authMiddleware';
import { uploader } from '../utils/multer';

export const router = express.Router();

//Category api list
router.post('/api/v1/product/category', authMiddleware, categoryAddController);
router.get('/api/v1/product/category', authMiddleware, serviceListController);
router.put(
  '/api/v1/product/category/update/:id',
  authMiddleware,
  categoryUpdateController,
);
router.put(
  '/api/v1/product/category/delete/:id',
  authMiddleware,
  categoryDeleteController,
);

//Child Category api list
router.post(
  '/api/v1/product/child-category',
  authMiddleware,
  addChildCategoryController,
);
router.get(
  '/api/v1/product/child-category',
  authMiddleware,
  listChildCategoryController,
);
router.put(
  '/api/v1/product/child-category/update/:id',
  authMiddleware,
  updateChildCategoryController,
);
router.put(
  '/api/v1/product/child-category/delete/:id',
  authMiddleware,
  deleteChildCategoryController,
);

//Sub Category api list
router.post('/api/v1/product/sub-category', authMiddleware, addSubCategoryController);
router.get('/api/v1/product/sub-category', authMiddleware, listSubCategoryController);
router.put(
  '/api/v1/product/sub-category/update/:id',
  authMiddleware,
  updateSubCategoryController,
);
router.put(
  '/api/v1/product/sub-category/delete/:id',
  authMiddleware,
  deleteSubCategoryController,
);

//Brand api list
router.post('/api/v1/product/brand', authMiddleware, addBrandController);
router.get('/api/v1/product/brand', authMiddleware, listBrandController);
router.put('/api/v1/product/brand/update/:id', authMiddleware, updateBrandController);
router.put('/api/v1/product/brand/delete/:id', authMiddleware, deleteBrandController);

//Age Group api list
router.post('/api/v1/product/age-group', authMiddleware, addAgeGroupController);
router.get('/api/v1/product/age-group', authMiddleware, listAgeGroupController);
router.put(
  '/api/v1/product/age-group/update/:id',
  authMiddleware,
  updateAgeGroupController,
);
router.put(
  '/api/v1/product/age-group/delete/:id',
  authMiddleware,
  deleteAgeGroupController,
);

//Origin api list
router.post('/api/v1/product/origin', authMiddleware, addOrginController);
router.get('/api/v1/product/origin', authMiddleware, listOriginController);
router.put('/api/v1/product/origin/update/:id', authMiddleware, updateOriginController);
router.put('/api/v1/product/origin/delete/:id', authMiddleware, deleteOriginController);

//Product api list
router.post(
  '/api/v1/product',
  uploader.array("image"),
  authMiddleware,
  addProductController,
);
router.get('/api/v1/product', authMiddleware, productListController);
router.put('/api/v1/product/:id', uploader.array("image"), authMiddleware, updateProductController);
router.put("/api/v1/product/delete/:id", authMiddleware, deleteProductController)
router.get("/api/v1/product/view/product/:id",authMiddleware, viewProductController)