import express from "express";

import { addCategoryController, listCategoryController, updateCategoryController, deleteCategoryController } from "../controller/testCategoryController"
import {validationMiddleware} from "../utils/validationMiddleware"
import {categoryValidation} from "../validation/categoryValidation"
export const router = express.Router()

router.post("/api/v1/lab-tests",validationMiddleware(categoryValidation),addCategoryController)
router.get("/api/v1/lab-tests",listCategoryController)
router.put("/api/v1/lab-tests/:id",validationMiddleware(categoryValidation),updateCategoryController)
router.put("/api/v1/lab-tests/delete/:id",validationMiddleware(categoryValidation),deleteCategoryController)
