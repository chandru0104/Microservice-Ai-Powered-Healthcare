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
const router = Router();

/**
 * @swagger
 * /api/otp/send:
 *   post:
 *     summary: Send OTP
 *     description: Send OTP to user email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/api/otp/send', otpSetController);

/**
 * @swagger
 * /api/verify/otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verify OTP provided by user
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post('/api/verify/otp', verifyOtpController);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register user
 *     description: Register a new user
 *     responses:
 *       200:
 *         description: User registered
 */
router.post('/api/register', uploader.single('profile'), userAddController);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve list of all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/api/user', userListController);

/**
 * @swagger
 * /api/user/profile/{id}:
 *   get:
 *     summary: Get user profile
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
router.get('/api/user/profile/:id', userProfileController);

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update user
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
  '/api/user/update/:id',
  uploader.single('profile'),
  userUpdateController,
);

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete user
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
router.delete('/api/user/delete/:id', userDeleteController);

export default router;
