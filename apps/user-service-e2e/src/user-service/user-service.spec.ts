import request from 'supertest';
import env from 'dotenv';

env.config();

const BASE_URL = process.env.USER_SERVICE_URL;

describe('User service - E2E test (GET API)', () => {
  it('It should 200 ok status', async () => {
    const res = await request(BASE_URL as any).get('/api/user');
    expect(res.statusCode).toBe(200);
  });
});
