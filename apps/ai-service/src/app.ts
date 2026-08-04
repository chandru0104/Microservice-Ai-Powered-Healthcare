import express from "express"
import helmet from "helmet"
import compression from "compression"
import { router } from "./router/router"
import cors from "cors"
import {swaggerSpec} from "./utils/swagger"
import swaggerUi from "swagger-ui-express"
export const app = express()

app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
app.use(compression())
app.use(helmet())

app.use(cors({
    origin:process.env.ORIGIN
}))

app.use("/api-doc/ai",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use((router))