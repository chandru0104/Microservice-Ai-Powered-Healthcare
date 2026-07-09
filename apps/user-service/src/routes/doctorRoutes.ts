import express from "express"
import { doctorAddController, verifyOtpController, listDoctorController, doctorUpdateController, doctorDeleteController,doctorProfileController } from "../controller/doctorController"
import { uploader } from '../utils/multer';
// import {doctorValidationMiddleware} from "../middleware/validationMiddleware"
// import {doctorValidation} from "../utils/validation"

export const routerDoctor = express.Router()



/**
 * @swagger
 * /api/v1/doctor:
 *   post:
 *     summary: Create a new doctor
 *     tags:
 *       - Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialties
 *               - experience
 *               - place
 *               - price
 *               - email
 *               - register
 *               - password
 *               - profile
 *             properties:
 *               name:
 *                 type: string
 *               specialties:
 *                 type: string
 *               experience:
 *                 type: string
 *               place:
 *                 type: string
 *               price:
 *                 type: number
 *               email:
 *                 type: string
 *                 format: email
 *               register:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               profile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Doctor created successfully
 *       400:
 *         description: Invalid request
 *       409:
 *         description: Doctor already exists
 */
routerDoctor.post(
  "/api/v1/doctor",
  uploader.single("profile"),
  doctorAddController
);

/**
 * @swagger
 * /api/v1/doctor/verfiy:
 *   post:
 *     summary: Verfiy otp
 *     tags:
 *       - Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Otp verify successfully
 *       400:
 *         description: Invalid otp
 */
routerDoctor.post("/api/v1/doctor/verfiy", verifyOtpController)

/**
 * @swagger
 * /api/v1/doctor:
 *   get:
 *     summary: Listed doctor list
 *     tags:
 *       - Doctor
 *     responses:
 *       200:
 *         description: Listed doctor list successfully
 */

routerDoctor.get("/api/v1/doctor", listDoctorController)

/**
 * @swagger
 * /api/v1/doctor/{id}:
 *   put:
 *     summary: Update doctor
 *     tags:
 *       - Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialties
 *               - experience
 *               - place
 *               - price
 *               - email
 *               - register
 *               - password
 *               - profile
 *             properties:
 *               name:
 *                 type: string
 *               specialties:
 *                 type: string
 *               experience:
 *                 type: string
 *               place:
 *                 type: string
 *               price:
 *                 type: number
 *               email:
 *                 type: string
 *                 format: email
 *               register:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               profile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Update doctor successfully
 *       400:
 *         description: Invalid request
 */

routerDoctor.put("/api/v1/doctor/:id", uploader.single("profile"), doctorUpdateController)

/**
 * @swagger
 * /api/v1/doctor/delete/{id}:
 *   put:
 *     summary: Doctor deleteda api
 *     tags:
 *       - Doctor
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       400:
 *         description: Invalid doctor id
 */

routerDoctor.put("/api/v1/doctor/delete/:id", doctorDeleteController)

/**
 * @swagger
 * /api/v1/doctor/profile/{id}:
 *   get:
 *     summary: Doctor profile
 *     tags:
 *       - Doctor
 *     responses:
 *       200:
 *         description: Doctor profile successfully
 */

routerDoctor.get("/api/v1/doctor/profile/:id",doctorProfileController)

