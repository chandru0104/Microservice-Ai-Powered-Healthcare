import express from "express"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import {orderRouter} from "./router/orderRouter"

export const app = express()

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))

app.use(helmet())
app.use(morgan("combined"))
app.use(compression)
app.use(orderRouter)
