import { Router } from "express";
import { authMiddleware } from "../middleware/auth"
import { addAppointmentController, listAppointmentController, userListAppointmentController } from "../controller/appointmentController"
import { appointmentPaymentController, appointmentPaymentVerifyController, appointmentPaymentListController, userListAppointmentPaymentController } from "../controller/appointmentPaymentController"
import { createFcmTokenController } from "../controller/createFcmTokenController"

export const router = Router()

router.post("/api/v1/appointment", authMiddleware, addAppointmentController)
router.get("/api/v1/appointment", authMiddleware, listAppointmentController)
router.get("/api/v1/appointment/user/:id", authMiddleware, userListAppointmentController)

router.post("/api/v1/appointment/payment/verify", authMiddleware, appointmentPaymentVerifyController)
router.post("/api/v1/appointment/payment/:id", authMiddleware, appointmentPaymentController)
router.get("/api/v1/appointment/payment/history", authMiddleware, appointmentPaymentListController)
router.get("/api/v1/appointment/payment/history/:id", authMiddleware, userListAppointmentPaymentController)

router.put("/api/v1/appointment/save-fcm-token", authMiddleware, createFcmTokenController)