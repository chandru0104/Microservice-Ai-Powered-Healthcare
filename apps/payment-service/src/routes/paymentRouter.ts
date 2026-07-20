import { Router } from "express";
import { createPaymentController, verfiyPaymentController } from "../controller/controller"
import { authMiddleware } from "../middleware/authMiddlerware"

export const router = Router()

router.post("/api/v1/payment", authMiddleware, createPaymentController)
router.post("/api/v1/payment/verify", authMiddleware, verfiyPaymentController)
