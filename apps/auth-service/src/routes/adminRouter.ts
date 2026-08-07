
import Router from "express"
import {adminLoginController} from "../controller/adminLoginController"
export const adminRouter = Router()

adminRouter.post("/admin-login",adminLoginController)