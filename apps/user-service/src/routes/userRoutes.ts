import { Router } from 'express';
import {
  userAddController,
  userListController,
  userDeleteController,
  userProfileController,
  userUpdateController,
  verifyOtpController,

} from '../controller/userController';
import { uploader } from '../utils/multer';
import { otpSetController } from '../controller/userController';

// import { userValidation } from "../utils/validation"

// import { validationMiddleware } from "../middleware/validationMiddleware"
const router = Router();

/**
 * @swagger
 * /api/otp/send:
 *   post:
 *     summary: Send OTP
 *     tags:
 *       - User send otp
 *     description: Send OTP to user email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/api/v1/otp/send', otpSetController);

/**
 * @swagger
 * /api/verify/otp:
 *   post:
 *     summary: Verify OTP
 *     tags:
 *       - Verfiy otp
 *     description: Verify OTP provided by user
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post('/api/v1/verify/otp', verifyOtpController);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - User Regsiter
 *     description: Register a new user
 *     responses:
 *       200:
 *         description: User registered
 */
router.post('/api/v1/user/register', userAddController);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User list
 *     description: Retrieve list of all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/api/v1/user', userListController);

/**
 * @swagger
 * /api/user/profile/{id}:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - User prfile
 *     description: Get profile of specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/api/v1/user/profile/:id', userProfileController);

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update user
 *     tags:
 *       - User update
 *     description: Update user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put(
  '/api/v1/user/update/:id',

  uploader.single('profile'),
  userUpdateController,
);

/**
 * @swagger
 * /api/user/delete/{id}:
 *   put:
 *     summary: Delete user
 *     tags:
 *       - User delete
 *     description: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.put('/api/v1/user/delete/:id', userDeleteController);


export default router;
