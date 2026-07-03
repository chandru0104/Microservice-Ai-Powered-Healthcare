import dotenv from "dotenv"

import swaggerJSDoc from "swagger-jsdoc"
dotenv.config()


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lab Test",
      description: "Tab Test Services",
      version: "1.0.0"
    },
    servers: [
      {
        url: process.env.LAB_SERVICE_PORT_URL
      }
    ],
  },
  apis: ["apps/lab-test-service/src/route/routes.ts"]
}

export const swaggerSpec = swaggerJSDoc(options)