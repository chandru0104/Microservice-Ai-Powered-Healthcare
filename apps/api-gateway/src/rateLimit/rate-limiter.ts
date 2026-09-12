import rateLimit from 'express-rate-limit';

export const limit = rateLimit({
  windowMs: 60 * 1000,
  max: 2000,
  message: 'Heavy requests, please try again later',
});
