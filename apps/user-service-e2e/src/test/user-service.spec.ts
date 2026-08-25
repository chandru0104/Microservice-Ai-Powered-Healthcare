// import request from 'supertest';
// import path from "path"
// const BASE_URL = process.env.USER_SERVICE_URL as string

// describe("POST /register", () => {
//   it("User register api", async () => {

//     const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

//     const res = await request(BASE_URL).post("/register").send({
//       name: "chandru",
//       email: uniqueEmail,
//       password: "123456"
//     })

//     expect(res.status).toBe(201)
//     expect(res.body).toHaveProperty("data.email")
//     expect(res.body).toHaveProperty("data.name")
//     expect(res.body).toHaveProperty("success", true)
    
//   })
// })


// describe("POST /doctor-register" ,()=>{
//   it("Doctor register api" ,async()=>{
//     const rondomEmail = `test!${Date.now()}@gmail.com`
//     const res = await request(BASE_URL).post("/doctor-register")
//      .field("name", "test")
//      .field("password", "test")
//      .field("specialties", "test")
//      .field("email", rondomEmail)
//      .field("experience", "2")
//      .field("price", "12")
//      .field("register", "231")
//      .field("place", "test")
//      .attach("profile", path.join(__dirname , "file/profile.png"))

//     expect(res.status).toBe(201)
//   }, 15000)
// })