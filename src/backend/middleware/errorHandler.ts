import { Request, Response, NextFunction } from "express";
import { logger, errorLogger } from "../utils/logger";
import { formatErrorResponse, getErrorLogLevel } from "../utils/errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Log the error with appropriate level
  const logLevel = getErrorLogLevel(error);

  if (logLevel === "error") {
    errorLogger.httpError(error, req, res);
  } else {
    logger.warn("Client error", {
      message: error.message,
      method: req.method,
      url: req.url,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      userId: (req as any).user?.id,
    });
  }

  // Format error response
  const errorResponse = formatErrorResponse(error);

  // Determine status code
  const statusCode = (error as any).statusCode || 500;

  // Add request ID if available
  if (req.headers["x-request-id"]) {
    (errorResponse as any).requestId = req.headers["x-request-id"];
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    code: "NOT_FOUND",
    timestamp: new Date().toISOString(),
  });
};

// Async error wrapper to catch async errors in route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
