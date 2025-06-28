import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger, performanceLogger } from "../utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const startTime = Date.now();
  const requestId = uuidv4();

  // Add request ID to headers for tracking
  req.headers["x-request-id"] = requestId;
  res.setHeader("x-request-id", requestId);

  // Log request start
  logger.info("Request started", {
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  // Override res.end to capture response details
  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any): void {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log request completion
    logger.info("Request completed", {
      requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

    // Log performance metrics for slow requests
    if (duration > 1000) {
      logger.warn("Slow request detected", {
        requestId,
        method: req.method,
        url: req.url,
        duration: `${duration}ms`,
      });
    }

    // Call original end method
    originalEnd.call(this, chunk, encoding);
  };

  next();
};
