import { app } from "./app"
import { dbConnect } from "./utils/db"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./utils/swagger"
dotenv.config()

const PORT = process.env.LAB_SERVICE_PORT

dbConnect()

app.use("/api-docs/labtest", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})