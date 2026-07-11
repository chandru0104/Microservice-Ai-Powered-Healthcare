import express from 'express';
import { loginController } from '../controller/loginController';
import { forgotPasswordContrroller } from '../controller/forgotPasswordController';
import { verifyOtpController } from '../controller/verifyOtpController';
import { newPasswordController } from '../controller/newPasswordController';
import { refreshTokenController } from '../controller/refreshTokenController';
import { googleLoginController } from '../controller/googleLoginController';
import {doctorLoginController} from "../controller/doctorLoginController"

import {forgotPasswordController} from "../controller/doctorForgotController"
import {verfiyOtpDoctorController} from "../controller/verfiyOtpDoctorController"

export const router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successfully
 */
router.post('/api/v1/auth/user/login', loginController);

/**
 * @swagger
 * /api/forgot/password:
 *   post:
 *     summary: Forgot Password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Send OTP Successfully
 */
router.post('/api/v1/auth/forgot/password', forgotPasswordContrroller);

/**
 * @swagger
 * /api/verfiy/otp:
 *   post:
 *     summary: Verify OTP
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verify OTP Successfully
 */
router.post('/api/v1/auth/verfiy/otp', verifyOtpController);

/**
 * @swagger
 * /api/new/password:
 *   post:
 *     summary: New Password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Set New Password Successfully
 */
router.post('/api/v1/auth/new/password', newPasswordController);

/**
 * @swagger
 * /api/refresh-token:
 *   post:
 *     summary: Create New Access Token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Create New Access Token Successfully
 */
router.post('/api/v1/auth/refresh-token', refreshTokenController);

/**
 * @swagger
 * /api/google-login
 *   post:
 *     summary:Google Login
 *     tags:
 *       -Auth
 *     requestBody:
 *       require:true
 *         content:
 *           application/json
 *             schema:
 *               type:object
 *               properties:
 *                 code:
 *                   type:string
 *                 role:
 *                   type:string
 *      response
 *        200
 *          description:Google Login Successfully
 */

router.post('/api/v1/auth/google/login', googleLoginController);


router.post("/api/v1/auth/doctor/login",doctorLoginController)

router.post("/api/v1/auth/forgot-doctor/password",forgotPasswordController)

router.post("/api/v1/auth/verify-doctor/otp",verfiyOtpDoctorController)