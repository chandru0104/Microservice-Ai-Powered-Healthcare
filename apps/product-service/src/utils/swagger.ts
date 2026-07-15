import dotenv from "dotenv"
dotenv.config()

import swaggerJsDoc from "swagger-jsdoc"

const option = {
    definition: {
       openapi:"3.0.0",
       info:{
        title:"Product api",
        description:"api product section add",
        version:"1.0.0"
       },
       servers:[
        {
            url:process.env.PRODUCT_SERVICE_PORT
        }
       ]
    } ,
    apis:["apps/product-service/src/routes/routes.ts"]
}

export const swagger = swaggerJsDoc(option)