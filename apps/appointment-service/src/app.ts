import helmet from "helmet"
import compression from "compression"
import express from "express"
import { router } from "./router/router"
import morgan from "morgan"
import { swaggerSpec } from "./utils/swagger"
import swaggerUi from "swagger-ui-express"

export const app = express()
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
app.use(helmet())
app.use(compression())
app.use(morgan("combined"))

app.use("/doc-appointment/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(router)