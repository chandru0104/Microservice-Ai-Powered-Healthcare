import { app } from "./app"
import dotenv from "dotenv"
import { connectDb } from "./utils/db"

dotenv.config()


const PORT = process.env.APPOINTMENT_SERVICE
connectDb()

app.listen(PORT, () => {
  console.log(`Appoinment service on running ${PORT}`)
})