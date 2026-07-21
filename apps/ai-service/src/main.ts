import { app } from "./app"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.AI_SERVICE_PORT


app.listen(PORT, () => {
  console.log(`Ai service running ${PORT}`)
})