import express from 'express';
import { loginController } from '../controller/loginController';
import { forgotPasswordContrroller } from '../controller/forgotPasswordController';
import { verifyOtpController } from '../controller/verifyOtpController';
import { newPasswordController } from '../controller/newPasswordController';
import { refreshTokenController } from '../controller/refreshTokenController';
import { googleLoginController } from '../controller/googleLoginController';
import { doctorLoginController } from "../controller/doctorLoginController"
import { forgotPasswordDoctorController } from "../controller/doctorForgotController"
import { verfiyOtpDoctorController } from "../controller/verfiyOtpDoctorController"
import { resetPassowrdDoctorController } from "../controller/resetPassowrdDoctorController"
import { refreshTokenDoctorController } from "../controller/refreshTokenDoctorController"
import { doctorGoogleLoginController } from "../controller/googleDoctorLoginController"

export const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/user/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - User
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
 * /api/v1/auth/forgot/password:
 *   post:
 *     summary: Forgot Password
 *     tags:
 *       - User
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
 * /api/v1/auth/verfiy/otp:
 *   post:
 *     summary: Verify OTP
 *     tags:
 *       - User
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
 * /api/v1/auth/new/password:
 *   post:
 *     summary: New Password
 *     tags:
 *       - User
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
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Create New Access Token
 *     tags:
 *       - User
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
 * /api/v1/auth/google/login:
 *   post:
 *     summary: Google Login
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - role
 *             properties:
 *               code:
 *                 type: string
 *                 example: "4/0AQSTgQ..."
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Google Login Successfully
 *       400:
 *         description: Bad Request
 */
router.post("/api/v1/auth/google/login", googleLoginController);





//Doctor auth section API


/**
 * @swagger
 * /api/v1/auth/doctor/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Doctor
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

router.post("/api/v1/auth/doctor/login", doctorLoginController)

/**
 * @swagger
 * /api/v1/auth/forgot-doctor/password:
 *   post:
 *     summary: Forgot Password
 *     tags:
 *       - Doctor
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

router.post("/api/v1/auth/forgot-doctor/password", forgotPasswordDoctorController)

/**
 * @swagger
 * /api/v1/auth/verify-doctor/otp:
 *   post:
 *     summary: Verify OTP
 *     tags:
 *       - Doctor
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

router.post("/api/v1/auth/verify-doctor/otp", verfiyOtpDoctorController)

/**
 * @swagger
 * /api/v1/auth/reset-doctor/password:
 *   post:
 *     summary: New Password
 *     tags:
 *       - Doctor
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

router.post("/api/v1/auth/reset-doctor/password", resetPassowrdDoctorController)

/**
 * @swagger
 * /api/v1/auth/doctor-refresh/token:
 *   post:
 *     summary: Create New Access Token
 *     tags:
 *       - Doctor
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

router.post("/api/v1/auth/doctor-refresh/token", refreshTokenDoctorController)


/**
 * @swagger
 * /api/v1/auth/google/doctor/login:
 *   post:
 *     summary: Google Login
 *     tags:
 *       - Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - role
 *             properties:
 *               code:
 *                 type: string
 *                 example: "4/0AQSTgQ..."
 *               role:
 *                 type: string
 *                 example: "doctor"
 *     responses:
 *       200:
 *         description: Google Login Successfully
 *       400:
 *         description: Bad Request
 */
router.post("/api/v1/auth/google/doctor/login", doctorGoogleLoginController);