import { Router } from "express";
import {authMiddleware} from "../middleware/auth"
import {addAppointmentController,listAppointmentController,userListAppointmentController} from "../controller/appointmentController"

export const router= Router()

router.post("/api/v1/appointment",authMiddleware,addAppointmentController)
router.get("/api/v1/appointment",authMiddleware,listAppointmentController)
router.get("/api/v1/appointment/user/:id",authMiddleware,userListAppointmentController)

