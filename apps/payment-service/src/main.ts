import { app } from "./app"
import dotenv from "dotenv"
import { connectDb } from "./utils/db"


dotenv.config()

const PORT = process.env.PAYMENT_PORT

connectDb()

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})