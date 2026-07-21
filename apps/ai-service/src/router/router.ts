import { Router } from "express";
import {aiSymptomsController} from "../controller/aiController"

export const router = Router()

router.post("/api/v1/ai/symptoms",aiSymptomsController)