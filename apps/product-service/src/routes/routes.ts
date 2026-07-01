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
} from '../controller/productController';

import { authMiddleware } from '../middleware/authMiddleware';
import { uploader } from '../utils/multer';

export const router = express.Router();

//Category api list
router.post('/api/category/add', authMiddleware, categoryAddController);
router.get('/api/category/list', authMiddleware, serviceListController);
router.put(
  '/api/category/update/:id',
  authMiddleware,
  categoryUpdateController,
);
router.put(
  '/api/category/delete/:id',
  authMiddleware,
  categoryDeleteController,
);

//Child Category api list
router.post(
  '/api/child-category/add',
  authMiddleware,
  addChildCategoryController,
);
router.get(
  '/api/child-category/list',
  authMiddleware,
  listChildCategoryController,
);
router.put(
  '/api/child-category/update/:id',
  authMiddleware,
  updateChildCategoryController,
);
router.put(
  '/api/child-category/delete/:id',
  authMiddleware,
  deleteChildCategoryController,
);

//Sub Category api list
router.post('/api/sub-category/add', authMiddleware, addSubCategoryController);
router.get('/api/sub-category/list', authMiddleware, listSubCategoryController);
router.put(
  '/api/sub-category/update/:id',
  authMiddleware,
  updateSubCategoryController,
);
router.put(
  '/api/sub-category/delete/:id',
  authMiddleware,
  deleteSubCategoryController,
);

//Brand api list
router.post('/api/brand/add', authMiddleware, addBrandController);
router.get('/api/brand/list', authMiddleware, listBrandController);
router.put('/api/brand/update/:id', authMiddleware, updateBrandController);
router.put('/api/brand/delete/:id', authMiddleware, deleteBrandController);

//Age Group api list
router.post('/api/age-group/add', authMiddleware, addAgeGroupController);
router.get('/api/age-group/list', authMiddleware, listAgeGroupController);
router.put(
  '/api/age-group/update/:id',
  authMiddleware,
  updateAgeGroupController,
);
router.put(
  '/api/age-group/delete/:id',
  authMiddleware,
  deleteAgeGroupController,
);

//Origin api list
router.post('/api/origin/add', authMiddleware, addOrginController);
router.get('/api/origin/list', authMiddleware, listOriginController);
router.put('/api/origin/update/:id', authMiddleware, updateOriginController);
router.put('/api/origin/delete/:id', authMiddleware, deleteOriginController);

//Product api list
router.post(
  '/api/product',
  uploader.any(),
  authMiddleware,
  addProductController,
);
router.get('/api/product', authMiddleware, productListController);
router.put('/api/product/:id',uploader.any(),authMiddleware, updateProductController);
router.put("/api/product/delete/:id",authMiddleware,deleteProductController)
