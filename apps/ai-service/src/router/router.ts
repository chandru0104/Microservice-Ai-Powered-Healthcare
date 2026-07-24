import { Router } from "express";
import {aiSymptomsController,aiReportController,aiMedicineReportController} from "../controller/aiController"
import {upload} from "../utils/multer"
export const router = Router()

router.post("/api/v1/ai/symptoms",aiSymptomsController)
router.post("/api/v1/ai/report",upload.single("file") ,aiReportController)
router.post("/api/v1/ai/medicine",upload.single("file") ,aiMedicineReportController)