
import swaggerJsdoc from "swagger-jsdoc";


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AI Service API",
            description: "AI Service API Documentation",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5007",
            },
        ],
    },
    apis: ["/apps/ai-service/src/router/router.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);