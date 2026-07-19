import { Router } from "express";
import { createPaymentController } from "../controller/controller"

export const router = Router()

router.post("/api/v1/payment", createPaymentController)

