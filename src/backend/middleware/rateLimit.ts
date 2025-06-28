import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { logger } from "../utils/logger";

// Create different rate limiters for different endpoints
export const generalRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests",
    message:
      "You have exceeded the maximum number of requests. Please try again later.",
    retryAfter: Math.ceil(
      parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000") / 1000,
    ),
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    logger.warn("Rate limit exceeded", {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      url: req.url,
      method: req.method,
    });

    res.status(429).json({
      error: "Too many requests",
      message:
        "You have exceeded the maximum number of requests. Please try again later.",
      retryAfter: Math.ceil(
        parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000") / 1000,
      ),
    });
  },
});

// Stricter rate limit for authentication endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT || "10"), // limit each IP to 10 auth requests per 15 minutes
  message: {
    error: "Too many authentication attempts",
    message: "Too many login attempts. Please try again later.",
    retryAfter: 900, // 15 minutes
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req: Request, res: Response) => {
    logger.warn("Auth rate limit exceeded", {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      url: req.url,
      method: req.method,
    });

    res.status(429).json({
      error: "Too many authentication attempts",
      message: "Too many login attempts. Please try again later.",
      retryAfter: 900,
    });
  },
});

// Rate limit for payment endpoints
export const paymentRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.PAYMENT_RATE_LIMIT || "100"), // limit each IP to 100 payment requests per hour
  message: {
    error: "Too many payment requests",
    message:
      "You have exceeded the maximum number of payment requests. Please try again later.",
    retryAfter: 3600, // 1 hour
  },
  handler: (req: Request, res: Response) => {
    logger.warn("Payment rate limit exceeded", {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      url: req.url,
      method: req.method,
    });

    res.status(429).json({
      error: "Too many payment requests",
      message:
        "You have exceeded the maximum number of payment requests. Please try again later.",
      retryAfter: 3600,
    });
  },
});

// API rate limit for general API endpoints
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: parseInt(process.env.API_RATE_LIMIT || "1000"), // limit each IP to 1000 API requests per minute
  message: {
    error: "API rate limit exceeded",
    message: "You have exceeded the API rate limit. Please try again later.",
    retryAfter: 60,
  },
  handler: (req: Request, res: Response) => {
    logger.warn("API rate limit exceeded", {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      url: req.url,
      method: req.method,
    });

    res.status(429).json({
      error: "API rate limit exceeded",
      message: "You have exceeded the API rate limit. Please try again later.",
      retryAfter: 60,
    });
  },
});

// Combine rate limiters based on path
export const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: Function,
) => {
  if (req.path.startsWith("/api/auth")) {
    return authRateLimit(req, res, next);
  } else if (req.path.startsWith("/api/payments")) {
    return paymentRateLimit(req, res, next);
  } else if (req.path.startsWith("/api/")) {
    return apiRateLimit(req, res, next);
  } else {
    return generalRateLimit(req, res, next);
  }
};
