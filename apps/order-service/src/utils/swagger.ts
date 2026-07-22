
import swaggerJsDoc from "swagger-jsdoc"


const option ={
    definition :{
        openapi:"3.0.0",
        info:{
            title:"Order service",
            description:"Order apis",
            version:"1.0.0"
        },
        servers:[{
            url:"http://localhost:"
        }]
    },
    apis:["apps/order-service/src/router/orderRouter.ts"]
}

export const swaggerSpec = swaggerJsDoc(option)