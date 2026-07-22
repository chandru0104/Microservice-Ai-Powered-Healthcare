import { Router } from "express";
import { createPaymentController, verfiyPaymentController } from "../controller/controller"
import { authMiddleware } from "../middleware/authMiddlerware"

export const router = Router()

/**
 * @swagger
 * /api/v1/payment:
 *   post:
 *     summary: Create payment
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment created successfully
 */
router.post('/api/v1/payment', authMiddleware, createPaymentController)

/**
 * @swagger
 * /api/v1/payment/verify:
 *   post:
 *     summary: Verify Razorpay payment
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *               - receipt
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
 */
router.post('/api/v1/payment/verify', authMiddleware, verfiyPaymentController)