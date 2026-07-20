// import {kafka} from "../utils/kafka"


// const producer = kafka.producer()

// const producerConnect = ()=>{
//     producer.connect()
//     console.log("order producer connected")
// }

// producerConnect()


// export const sendOderDetails = async(orderId:any)=>{
//     try{
//        producer.send({
//         topic:"order-topic",
//         messages:[
//             {
//                 value:JSON.stringify(orderId)
//             }
//         ]
//        })
//     }catch(error:any){
//         throw new Error(error.message)
//     }
// }