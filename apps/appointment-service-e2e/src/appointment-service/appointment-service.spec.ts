import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

describe("Appointment API", () => {
  it("should create an appointment", async () => {
    const token = "your_jwt_token";

    const result = await request(process.env.APPOINTMENT_PORT as string)
      .post("/api/v1/appointment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        doctor: "688b7c2d1234567890abcdef",
        date: "2026-08-01",
        time: "10:00 AM",
        day: "Monday",
        phone: "9876543210",
        gender: "Male",
        termsCondition: true,
        fees: 500,
      });

    expect(result.statusCode).toBe(201);
  });
} );     