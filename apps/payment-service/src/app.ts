import express from "express"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import { router } from "./routes/paymentRouter"
import {swaggerSpec} from "./utils/swagger"
import swaggerUi from "swagger-ui-express"


export const app = express()

app.use(express.urlencoded())
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(helmet())
app.use(compression())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/api-docs/paymet",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use(router)