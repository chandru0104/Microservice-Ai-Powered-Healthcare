import swaggerjsDoc from "swagger-jsdoc"


const option = {
    definitions: {
        openapi: "3.0.0",
        info: {
            title: "Ai service",
            summary: "Ai all api doc",
            version: "1.0.0"
        },
        service: [
            {
                url: "http://localhost:5007"
            }
        ],
    },
    apis: ["/apps/ai-service/src/router/router.ts"]

}

export const swaggerSpec = swaggerjsDoc(option)