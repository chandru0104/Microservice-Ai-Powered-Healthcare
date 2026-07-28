import helmet from "helmet"
import compression from "compression"
import express from "express"
import {router} from "./router/router"

export const app = express()
app.use(express.json({limit:"1mb"}))
app.use(express.urlencoded({extended:true,limit:"1mb"}))
app.use(helmet())
app.use(compression())
app.use(router)