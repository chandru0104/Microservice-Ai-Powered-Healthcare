import express from "express"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import {orderRouter} from "./router/orderRouter"
import {swaggerSpec} from "./utils/swagger"
import swaggerUi from "swagger-ui-express"


export const app = express()

app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({ extended: true ,limit:"1mb"}));


app.use(helmet())
app.use(morgan("combined"))
app.use(compression())

app.use("api-docs/order",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use(orderRouter)
