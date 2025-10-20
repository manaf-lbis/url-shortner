import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

