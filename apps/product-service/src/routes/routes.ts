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

import { cartAddController, cartListController, cartDeleteController, cartEditController } from "../controller/cartController"
import {Authorization} from "../middleware/authorization"
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

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Add Product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               expiryOn:
 *                 type: string
 *               benefit:
 *                 type: string
 *               variant:
 *                 type: string
 *               returnPolicy:
 *                 type: string
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               subcategoryId:
 *                 type: string
 *               childCategoryId:
 *                 type: string
 *               originId:
 *                 type: string
 *               brandId:
 *                 type: string
 *               ageGroupId:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product added successfully
 */

router.post(
  '/api/v1/product',
  uploader.any(),
  authMiddleware,
  Authorization("admin"),
  addProductController,
);

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Get Product List
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product list fetched successfully
 */
router.get('/api/v1/product', authMiddleware, productListController);


/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     summary: Update Product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               expiryOn:
 *                 type: string
 *               benefit:
 *                 type: string
 *               variant:
 *                 type: string
 *               returnPolicy:
 *                 type: string
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               subcategoryId:
 *                 type: string
 *               childCategoryId:
 *                 type: string
 *               originId:
 *                 type: string
 *               brandId:
 *                 type: string
 *               ageGroupId:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

router.put('/api/v1/product/:id', uploader.any(),authMiddleware, updateProductController);

/**
 * @swagger
 * /api/v1/product/delete/{id}:
 *   put:
 *     summary: Delete Product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */

router.put("/api/v1/product/delete/:id", authMiddleware, deleteProductController)

/**
 * @swagger
 * /api/v1/product/view/product/{id}:
 *   get:
 *     summary: View Product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details fetched successfully
 */
router.get("/api/v1/product/view/product/:id", authMiddleware, viewProductController)

//Cart api

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Add Product to Cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 */
router.post("/api/v1/cart", authMiddleware, cartAddController)

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get Cart List
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart list fetched successfully
 */
router.get("/api/v1/cart", authMiddleware, cartListController)


/**
 * @swagger
 * /api/v1/cart/{id}:
 *   put:
 *     summary: Update Cart Quantity
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
router.delete("/api/v1/cart/:id", authMiddleware, cartDeleteController)


/**
 * @swagger
 * /api/v1/cart/{id}:
 *   delete:
 *     summary: Delete Cart Item
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 */
router.put("/api/v1/cart/:id", authMiddleware, cartEditController)