import { Router } from "express";
import { authMiddleware } from "../middleware/auth"
import { addAppointmentController, listAppointmentController, userListAppointmentController } from "../controller/appointmentController"
import { appointmentPaymentController, appointmentPaymentVerifyController, appointmentPaymentListController, userListAppointmentPaymentController } from "../controller/appointmentPaymentController"
import { createFcmTokenController } from "../controller/createFcmTokenController"
import {appointmentValidationMiddleware} from "../middleware/validationMiddlerware"
import {appointmentValidation} from "../utils/validation"
import {videoCallController} from "../controller/videoCallController"
export const router = Router()

/**
 * @swagger
 * /api/v1/appointment:
 *   post:
 *     summary: Create Appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               day:
 *                 type: string
 *               user:
 *                 type: string
 *               phone:
 *                 type: number
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Not to say]
 *               termsCondition:
 *                 type: boolean
 *               fees:
 *                 type: number
 *               payment:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Bad Request
 */
router.post("/add", authMiddleware,appointmentValidationMiddleware(appointmentValidation), addAppointmentController);


/**
 * @swagger
 * /api/v1/appointment:
 *   get:
 *     summary: Get All Appointments
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/list", authMiddleware, listAppointmentController);

/**
 * @swagger
 * /api/v1/appointment/user/{id}:
 *   get:
 *     summary: Get User Appointments
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/user/:id", authMiddleware, userListAppointmentController);

/**
 * @swagger
 * /api/v1/appointment/payment/{id}:
 *   post:
 *     summary: Create Appointment Payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
    "/payment/:id",
    authMiddleware,
    appointmentPaymentController
);


/**
 * @swagger
 * /api/v1/appointment/payment/verify:
 *   post:
 *     summary: Verify Appointment Payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *               receipt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid payment details
 *       500:
 *         description: Internal Server Error
 */
router.post(
    "/payment/verify",
    authMiddleware,
    appointmentPaymentVerifyController
);

/**
 * @swagger
 * /api/v1/appointment/payment/history:
 *   get:
 *     summary: Get All Appointment Payment History
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Payment history fetched successfully
 *       500:
 *         description: Internal Server Error
 */
router.get(
    "/payment/history",
    authMiddleware,
    appointmentPaymentListController
);


/**
 * @swagger
 * /api/v1/appointment/payment/history/{id}:
 *   get:
 *     summary: Get User Appointment Payment History
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User payment history fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
    "/payment/history/:id",
    authMiddleware,
    userListAppointmentPaymentController
);

/**
 * @swagger
 * /api/v1/appointment/save-fcm-token:
 *   put:
 *     summary: Save FCM Token
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: "688a123456789abcdef12345"
 *               token:
 *                 type: string
 *                 example: "eR7hGxA1BcD2EfGhIjKlMnOpQrStUvWxYz1234567890"
 *     responses:
 *       200:
 *         description: FCM token updated successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put(
    "/save-fcm-token",
    authMiddleware,
    createFcmTokenController
);



router.post("/video-call",authMiddleware,videoCallController)