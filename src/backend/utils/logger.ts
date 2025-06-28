import winston from "winston";
import path from "path";

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint(),
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += `\n${JSON.stringify(meta, null, 2)}`;
    }
    return msg;
  }),
);

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  defaultMeta: {
    service: "atlas-backend",
    environment: process.env.NODE_ENV || "development",
  },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: process.env.NODE_ENV === "production" ? logFormat : consoleFormat,
      level: process.env.NODE_ENV === "production" ? "warn" : "debug",
    }),
  ],
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Add file transports for production
if (process.env.NODE_ENV === "production") {
  const logDir = process.env.LOG_DIR || "./logs";

  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: logFormat,
    }),
  );

  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: logFormat,
    }),
  );

  // Add daily rotate file transport for better log management
  try {
    const DailyRotateFile = require("winston-daily-rotate-file");

    logger.add(
      new DailyRotateFile({
        filename: path.join(logDir, "application-%DATE%.log"),
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        format: logFormat,
      }),
    );
  } catch (error) {
    // winston-daily-rotate-file is optional
    logger.warn("Daily rotate file transport not available");
  }
}

// Handle uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new winston.transports.Console({
    format: consoleFormat,
  }),
);

logger.rejections.handle(
  new winston.transports.Console({
    format: consoleFormat,
  }),
);

// Create structured logging helpers
export const createLogger = (module: string) => {
  return {
    debug: (message: string, meta?: any) =>
      logger.debug(message, { module, ...meta }),
    info: (message: string, meta?: any) =>
      logger.info(message, { module, ...meta }),
    warn: (message: string, meta?: any) =>
      logger.warn(message, { module, ...meta }),
    error: (message: string, meta?: any) =>
      logger.error(message, { module, ...meta }),

    // Performance logging
    time: (label: string) => console.time(`[${module}] ${label}`),
    timeEnd: (label: string) => console.timeEnd(`[${module}] ${label}`),

    // Request logging
    request: (req: any, additionalMeta?: any) => {
      logger.info("Request received", {
        module,
        method: req.method,
        url: req.url,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
        userId: req.user?.id,
        workspaceId: req.user?.workspaceId,
        ...additionalMeta,
      });
    },

    // Response logging
    response: (req: any, res: any, duration: number, additionalMeta?: any) => {
      logger.info("Request completed", {
        module,
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userId: req.user?.id,
        workspaceId: req.user?.workspaceId,
        ...additionalMeta,
      });
    },

    // Security logging
    security: (event: string, details: any) => {
      logger.warn("Security event", {
        module,
        event,
        timestamp: new Date().toISOString(),
        ...details,
      });
    },

    // Business logic logging
    business: (action: string, details: any) => {
      logger.info("Business action", {
        module,
        action,
        timestamp: new Date().toISOString(),
        ...details,
      });
    },
  };
};

// Audit logging for compliance
export const auditLogger = {
  log: (action: string, details: any) => {
    logger.info("AUDIT", {
      type: "audit",
      action,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },

  userAction: (
    userId: string,
    action: string,
    resource: string,
    details?: any,
  ) => {
    logger.info("USER_AUDIT", {
      type: "user_audit",
      userId,
      action,
      resource,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },

  systemAction: (action: string, details: any) => {
    logger.info("SYSTEM_AUDIT", {
      type: "system_audit",
      action,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },

  securityEvent: (severity: string, event: string, details: any) => {
    logger.warn("SECURITY_AUDIT", {
      type: "security_audit",
      severity,
      event,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },
};

// Performance monitoring
export const performanceLogger = {
  startTimer: (operation: string) => {
    const start = Date.now();
    return {
      end: (additionalMeta?: any) => {
        const duration = Date.now() - start;
        logger.info("Performance metric", {
          type: "performance",
          operation,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
          ...additionalMeta,
        });
        return duration;
      },
    };
  },

  memory: () => {
    const usage = process.memoryUsage();
    logger.info("Memory usage", {
      type: "memory",
      rss: `${Math.round((usage.rss / 1024 / 1024) * 100) / 100} MB`,
      heapTotal: `${Math.round((usage.heapTotal / 1024 / 1024) * 100) / 100} MB`,
      heapUsed: `${Math.round((usage.heapUsed / 1024 / 1024) * 100) / 100} MB`,
      external: `${Math.round((usage.external / 1024 / 1024) * 100) / 100} MB`,
      timestamp: new Date().toISOString(),
    });
  },

  cpu: () => {
    const usage = process.cpuUsage();
    logger.info("CPU usage", {
      type: "cpu",
      user: usage.user,
      system: usage.system,
      timestamp: new Date().toISOString(),
    });
  },
};

// Error logging with context
export const errorLogger = {
  log: (error: Error, context?: any) => {
    logger.error("Application error", {
      type: "error",
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString(),
      ...context,
    });
  },

  httpError: (error: Error, req: any, res?: any) => {
    logger.error("HTTP error", {
      type: "http_error",
      message: error.message,
      stack: error.stack,
      method: req.method,
      url: req.url,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      userId: req.user?.id,
      statusCode: res?.statusCode,
      timestamp: new Date().toISOString(),
    });
  },

  validationError: (error: Error, data?: any) => {
    logger.warn("Validation error", {
      type: "validation_error",
      message: error.message,
      data,
      timestamp: new Date().toISOString(),
    });
  },

  databaseError: (error: Error, query?: string, params?: any) => {
    logger.error("Database error", {
      type: "database_error",
      message: error.message,
      stack: error.stack,
      query,
      params,
      timestamp: new Date().toISOString(),
    });
  },
};

export default logger;
