import { Router } from "express";
import { addOrderController, listOderController, listUserOderController } from "../controller/orderController"
import { authMiddleware } from "../middlerware/authMiddleware"
import { checkRole } from "../middlerware/checkRoleMiddlerware"
import { validationMiddlerware } from "../middlerware/validationMiddleware"
import { orderValidation } from "../utils/validation"
export const orderRouter = Router()

orderRouter.post("/api/v1/order", authMiddleware, validationMiddlerware(orderValidation), addOrderController)
orderRouter.get("/api/v1/order", authMiddleware, checkRole("admin"), listOderController)
orderRouter.get("/api/v1/order/user", authMiddleware, listUserOderController)