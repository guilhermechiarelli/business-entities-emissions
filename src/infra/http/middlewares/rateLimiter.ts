import rateLimit from 'express-rate-limit'

function minutesToMilliseconds(minutes: number) {
  return minutes * 60 * 1000
}

export const rateLimiter = rateLimit({
  windowMs: minutesToMilliseconds(10),
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
})
