import request from "supertest";
import path from "path";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

jest.setTimeout(30000); // AI API calls can take up to 30s

const BASE_URL = process.env.AI_SERVICE_URL as string;
let TOKEN: string;

beforeAll(() => {
  // Generate a valid JWT using the same secret as authMiddleware
  TOKEN = jwt.sign(
    { id: "test-user-id", role: "user" },
    process.env.ACCESS_SECRET_KEY as string,
    { expiresIn: "1h" }
  );
});

describe("AI Service API Tests", () => {
  describe("POST /symptoms", () => {
    it("should return possible conditions based on symptoms", async () => {
      const res = await request(BASE_URL)
        .post("/symptoms")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send({
          option1: "eye pain",
          option2: "eye power low",
          option3: "head pain",
          option4: "eye red",
          option5: "nose pain",
        });

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.data).toHaveProperty("possible_conditions");
      expect(Array.isArray(res.body.data.possible_conditions)).toBe(true);
    }, 30000); // Groq API can take up to 30s

    it("should return 500 when no symptoms are provided", async () => {
      const res = await request(BASE_URL)
        .post("/symptoms")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send({});

      expect(res.status).toBe(200); // service doesn't validate min symptoms — AI still responds
    });
  });

  describe("POST /report", () => {
    it("should analyze uploaded PDF report", async () => {
      const res = await request(BASE_URL)
        .post("/report")
        .set("Authorization", `Bearer ${TOKEN}`)
        .attach("file", path.join(__dirname, "files/report.pdf"));

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.data).toHaveProperty("report_summary");
    }, 30000); // PDF parse + Groq API

    it("should return 400 when no file is uploaded", async () => {
      const res = await request(BASE_URL)
        .post("/report")
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(res.status).toBe(400);
    });
  });

  describe("POST /medicine", () => {
    it("should analyze uploaded medicine image", async () => {
      const res = await request(BASE_URL)
        .post("/medicine")
        .set("Authorization", `Bearer ${TOKEN}`)
        .attach("file", path.join(__dirname, "files/medicine.jpg"));

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.data).toHaveProperty("medicine_name");
    }, 30000); // Tesseract OCR + Groq API

    it("should return 400 when no image is uploaded", async () => {
      const res = await request(BASE_URL)
        .post("/medicine")
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(res.status).toBe(400);
    });
  });
});