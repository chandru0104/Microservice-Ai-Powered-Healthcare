import { Kafka } from "kafkajs"


export const kafka = new Kafka({
    clientId: "appointment",
    brokers: ["localhost:9092"]
})