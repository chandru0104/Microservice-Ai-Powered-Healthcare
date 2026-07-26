import { Router } from "express";
import { aiSymptomsController, aiReportController, aiMedicineReportController } from "../controller/aiController"
import { authMiddleware } from "../middleware/auth"
import { upload } from "../utils/multer"
export const router = Router()



/**
 * @swagger
 * /api/v1/ai/symptoms:
 *   post:
 *     summary: Ai symptoms
 *     tags:
 *       - Ai
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               option1:
 *                 type: string
 *               option2:
 *                 type: string
 *               option3:
 *                 type: string
 *               option4:
 *                 type: string
 *               option5:
 *                 type: string
 *     responses:
 *       200:
 *         description: Symptoms analyzed successfully
 */
router.post("/api/v1/ai/symptoms", authMiddleware, aiSymptomsController)

/**
 * @swagger
 * /api/v1/ai/report:
 *   post:
 *     summary: Ai report
 *     tags:
 *       - Ai
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *     responses:
 *       200:
 *         description: Report processed successfully
 */
router.post("/api/v1/ai/report", upload.single("file"), authMiddleware, aiReportController)


/**
 * @swagger
 * /api/v1/ai/medicine:
 *   post:
 *     summary: Ai report
 *     tags:
 *       - Ai
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *     responses:
 *       200:
 *         description: Symptoms analyzed successfully
 */
router.post("/api/v1/ai/medicine", upload.single("file"), authMiddleware, aiMedicineReportController)