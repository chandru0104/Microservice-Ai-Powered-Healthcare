import express from "express"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import { router } from "./routes/paymentRouter"

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

app.use(router)