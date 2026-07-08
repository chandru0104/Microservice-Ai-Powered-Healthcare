import request  from "supertest";
import dotenv from "dotenv"

dotenv.config()
const PORT =process.env.LAB_SERVICE_URL
describe("Lab test add",()=>{
  it("add a require filed must", async()=>{
    const res = await request(PORT as string).get("/api/v1/lab-tests")
    expect(res.status).toBe(201)
  })
})