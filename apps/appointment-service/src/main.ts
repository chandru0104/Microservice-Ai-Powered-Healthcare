import { app } from "./app"
import dotenv from "dotenv"
import { connectDb } from "./utils/db"
import "./consumer/consumer"

dotenv.config()


const PORT = process.env.APPOINTMENT_PORT
connectDb()

app.listen(PORT, () => {
  console.log(`Appoinment service on running ${PORT}`)
})