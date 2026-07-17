import {app} from "./app"
import dotenv from "dotenv"
import {dbConnected} from "./utils/db"

dotenv.config()

const PORT = process.env.ORDER_SERVICE_PORT
dbConnected()

app.listen(PORT,()=>{
    console.log(`Order Service running in ${PORT}`)
})

