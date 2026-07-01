import {app} from "./app"
import {dbConnect} from "./utils/db"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.LAB_SERVICE_PORT

dbConnect()

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})