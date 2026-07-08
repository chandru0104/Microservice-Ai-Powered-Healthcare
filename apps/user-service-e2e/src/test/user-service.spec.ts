import request from 'supertest';
import env from 'dotenv';

env.config();

const BASE_URL = process.env.USER_SERVICE_URL as string

describe('User service - E2E test (GET API)', () => {
  it('It should 200 ok status', async () => {
    const res = await request(BASE_URL).post('/api/v1/register').send({
      email:"admin@gmail.com",
      passowrd:"123456",
      otp:"232323"
    });
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true);
  });
});
