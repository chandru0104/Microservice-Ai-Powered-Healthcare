import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment Service API",
      version: "1.0.0",
      description: "Appointment Service APIs",
    },
    servers: [
      {
        url: "http://localhost:5008",
      },
    ],
  },
  apis: ["apps/appointment-service/src/router/router.ts"],
};

export const swaggerSpec = swaggerJsDoc(options);