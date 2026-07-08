import express from "express"
import { router } from "./route/routes"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
export const app = express()

app.use(express.json({ limit: "20mb" }))

app.use(morgan("combined"))

app.use(helmet())

app.use(compression())

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(express.urlencoded({ extended: true, limit: "20mb" }))
app.use(router)


