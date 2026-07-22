import swaggerJsDoc from "swagger-jsdoc"


 const option={
    definition:{
        openapi:"3.0.0",
        info:{
           title:"Payment service",
           description:"Payment service api docs",
           version:"1.0.0"
        },
        servers:[{
            url:"http://localhost:5006"
        }]
    },
    apis:["apps/payment-service/src/routes/paymentRouter.ts"]
}


export const swaggerSpec = swaggerJsDoc(option)