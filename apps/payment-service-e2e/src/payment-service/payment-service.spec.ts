import request  from "supertest"
import dotenv from "dotenv"


describe("Payment test",()=>{
  it("Payment test post api",async ()=>{
    const payload={
      orderId:"1"
    }
    const res = await request(process.env.PAYMENT_URL as string).post("/api/v1/payment").send(payload)
    expect(res.status).toBe(200)
  })
})

describe("Verify payment",()=>{
  it("payment verrify post api",async()=>{
    const payload={
      razorpay_order_id:"32323weqweqw",razorpay_payment_id:"dfsdef312234124",razorpay_signature:"234edwd",receipt:"123ewqeqwed"
    }

    const res =await request(process.env.PAYMENT_URL as string).post("/api/v1/payment/verify").send(payload)  
    expect(res.status).toBe(200)
  })
})