import express from "express"
import { router } from "./routes/routes"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

export const app = express()

app.use(express.urlencoded({ extended: true, limit: "20mb" }))
app.use(express.json({ limit: "20mb", }))
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.use(morgan("combined"))
app.use(cors({
    origin: "localhost:3000",
}))

app.use(router)

