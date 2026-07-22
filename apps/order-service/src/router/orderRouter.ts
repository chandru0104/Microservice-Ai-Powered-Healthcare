import { Router } from "express";
import { addOrderController, listOderController, listUserOderController } from "../controller/orderController"
import { authMiddleware } from "../middlerware/authMiddleware"
import { checkRole } from "../middlerware/checkRoleMiddlerware"
import { validationMiddlerware } from "../middlerware/validationMiddleware"
import { orderValidation } from "../utils/validation"
export const orderRouter = Router()


/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Order add
 *     tags:
 *       - Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               shippingAddress:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order placed successfully
 */
orderRouter.post("/api/v1/order", authMiddleware, validationMiddlerware(orderValidation), addOrderController)
/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
orderRouter.get(
    '/api/v1/order',
    authMiddleware,
    checkRole('admin'),
    listOderController
);

/**
 * @swagger
 * /api/v1/order/user:
 *   get:
 *     summary: Get logged-in user orders
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: User orders fetched successfully
 */
orderRouter.get(
    '/api/v1/order/user',
    authMiddleware,
    listUserOderController
);