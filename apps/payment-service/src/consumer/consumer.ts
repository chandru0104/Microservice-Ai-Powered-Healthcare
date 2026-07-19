// import { kafka } from "../utils/kafka"
// import { createPaymentService } from "../service/paymentService"
// console.log('🚀 Consumer file started');
// const consumer = kafka.consumer({
//     groupId: "payment-service"
// })

// export const connectConsumer = async () => {
//     await consumer.connect()
//     console.log("Payment consumer connected")

//     await consumer.subscribe({
//         topic: "order-topic",
//         fromBeginning: false
//     })

//     await consumer.run({
//         eachMessage: async ({ message }) => {
//             if (!message.value) {
//                 throw new Error('Missing your data');
//             }
//             const orderId = JSON.parse(message.value.toString())
//             console.log("Received orderId from Kafka:", orderId)
//             await createPaymentService(orderId)
//         }
//     })
// }

