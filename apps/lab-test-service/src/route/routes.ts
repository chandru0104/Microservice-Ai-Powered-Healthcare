import express from "express";

import { addCategoryController, listCategoryController, updateCategoryController, deleteCategoryController } from "../controller/testCategoryController"
import { testAddController, testListController, testUpdatController, testDeleteController, testListOneController } from "../controller/testController"

import { validationMiddleware } from "../utils/validationMiddleware"
import { categoryValidation } from "../validation/categoryValidation"
import { labTestValidation } from "../validation/labTes"
import {authMiddlewares} from "../middlewares/authMiddlewares"
import {authorize} from "../utils/authorize"
export const router = express.Router()

/**
 * @swagger
 * /api/v1/lab-category:
 *   post:
 *     summary: Create a lab category
 *     tags:
 *       - Lab Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Lab category created successfully
 *       400:
 *         description: Bad Request
 */
router.post(
  "/api/v1/lab-category",
  authMiddlewares,
  authorize("Admin"),
  validationMiddleware(categoryValidation),
  addCategoryController
);

/**
 * @swagger
 * /api/v1/lab-category:
 *   get:
 *     summary: Category list
 *     tags:
 *       - Lab Category
 *     responses:
 *       200:
 *         description: Listed data
 */
router.get("/api/v1/lab-category",listCategoryController)

/**
 * @swagger
 * /api/v1/lab-category/{id}:
 *   put:
 *     summary: Update lab test category
 *     tags:
 *       - Lab Category
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put("/api/v1/lab-category/:id",  authorize("Admin"),authMiddlewares, validationMiddleware(categoryValidation), updateCategoryController)


/**
 * @swagger
 * /api/v1/lab-category/delete/{id}:
 *   delete:
 *     summary: Delete a lab category
 *     tags:
 *       - Lab Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lab category ID
 *     responses:
 *       200:
 *         description: Lab category deleted successfully
 *       404:
 *         description: Lab category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/api/v1/lab-category/delete/:id",  authorize("Admin"),authMiddlewares, deleteCategoryController);


/**
 * @swagger
 * /api/v1/lab-tests:
 *   post:
 *     summary: Create a new lab test
 *     tags:
 *       - Lab Test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:,./
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Lab test created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
router.post("/api/v1/lab-tests",  authorize("Admin"),authMiddlewares, validationMiddleware(labTestValidation), testAddController)

/**
 * @swagger
 * /api/v1/lab-tests:
 *   get:
 *     summary: Get all lab tests
 *     tags:
 *       - Lab Test
 *     responses:
 *       200:
 *         description: Lab tests fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/api/v1/lab-tests", testListController);

/**
 * @swagger
 * /api/v1/lab-tests/{id}:
 *   get:
 *     summary: Get lab test by ID
 *     tags:
 *       - Lab Test
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lab test fetched successfully
 *       404:
 *         description: Lab test not found
 *       500:
 *         description: Internal server error
 */
router.get("/api/v1/lab-tests/:id", testListOneController);


/**
 * @swagger
 * /api/v1/lab-tests/{id}:
 *   put:
 *     summary: Update a lab test
 *     tags:
 *       - Lab Test
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
 *     responses:
 *       200:
 *         description: Lab test updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Lab test not found
 *       500:
 *         description: Internal server error
 */
router.put(
    "/api/v1/lab-tests/:id",authMiddlewares,  authorize("Admin"),
    validationMiddleware(labTestValidation),
    testUpdatController
);

/**
 * @swagger
 * /api/v1/lab-tests/delete/{id}:
 *   put:
 *     summary: Soft delete a lab test
 *     tags:
 *       - Lab Test
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lab test deleted successfully
 *       404:
 *         description: Lab test not found
 *       500:
 *         description: Internal server error
 */
router.put("/api/v1/lab-tests/delete/:id",  authorize("Admin"),authMiddlewares, testDeleteController);