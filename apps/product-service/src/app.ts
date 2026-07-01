import express from "express"
import {router} from "./routes/routes"

export const app = express()

app.use(express.urlencoded({extended:true,limit:"20mb"}))
app.use(express.json({limit:"20mb",}))
app.use(router)

