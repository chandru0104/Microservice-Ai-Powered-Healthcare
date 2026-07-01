import swaggerJSDoc from "swagger-jsdoc"



 const option:swaggerJSDoc.Options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Auth service",
            version:"1.0.0",
            description:"Auth service api docs"
        },
        servers:[{
            url:"http://localhost:5001"
        }]
    },
    apis:["apps/auth-service/src/routes/routes.ts"]

}

export const swaggerSpec =swaggerJSDoc(option)