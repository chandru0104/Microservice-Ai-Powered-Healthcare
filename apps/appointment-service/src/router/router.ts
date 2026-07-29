import { Router } from "express";
import {authMiddleware} from "../middleware/auth"
import {addAppointmentController,listAppointmentController,userListAppointmentController} from "../controller/appointmentController"
import {appointmentPaymentController,appointmentPaymentVerifyController,appointmentPaymentListController,userListAppointmentPaymentController} from "../controller/appointmentPaymentController"
export const router= Router()

router.post("/api/v1/appointment",addAppointmentController)
router.get("/api/v1/appointment",authMiddleware,listAppointmentController)
router.get("/api/v1/appointment/user/:id",authMiddleware,userListAppointmentController)

router.post("/api/v2/appointment/payment/verify",appointmentPaymentVerifyController)
router.post("/api/v2/appointment/payment/:id",appointmentPaymentController)
router.get("/api/v2/appointment/payment/history",appointmentPaymentListController)
router.get("/api/v2/appointment/payment/history/:id",userListAppointmentPaymentController)