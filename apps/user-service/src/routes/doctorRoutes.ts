import express from "express"
import { doctorAddController, verifyOtpController, listDoctorController, doctorUpdateController, doctorDeleteController } from "../controller/doctorController"
import { uploader } from '../utils/multer';
// import {doctorValidationMiddleware} from "../middleware/validationMiddleware"
// import {doctorValidation} from "../utils/validation"

export const routerDoctor = express.Router()

routerDoctor.post("/api/v1/doctor" ,uploader.single("profile"), doctorAddController)
routerDoctor.post("/api/v1/doctor/verfiy", verifyOtpController)
routerDoctor.get("/api/v1/doctor", listDoctorController)
routerDoctor.put("/api/v1/doctor/:id", uploader.single("profile"), doctorUpdateController)
routerDoctor.put("/api/v1/doctor/delete/:id", doctorDeleteController)
