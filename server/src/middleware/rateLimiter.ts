import rateLimit from "express-rate-limit";

export const calibrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error:
      "Too many calibrations. Please wait an hour before trying again.",
  },
});

export const rewriteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error:
      "Too many rewrites. Please wait an hour before trying again.",
  },
});

export const jobDescriptionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error:
      "You have reached the hourly job description analysis limit. Please try again later.",
  },
});