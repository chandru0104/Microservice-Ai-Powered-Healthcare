import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.API_GATEWAY_URL as string;

describe('GET / - Health Check', () => {
  it('should return 200 with gateway running message', async () => {
    const res = await request(BASE_URL).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
