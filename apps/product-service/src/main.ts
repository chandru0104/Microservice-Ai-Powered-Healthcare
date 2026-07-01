import {app} from "./app"
import dotenv from "dotenv"
import {connectDB} from "./utils/db"

dotenv.config()

connectDB()

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Product service running at ${PORT}`)
})