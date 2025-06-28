import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import morgan from "morgan";
import dotenv from "dotenv";

// Import route handlers
import authRoutes from "./routes/auth";
import workspaceRoutes from "./routes/workspaces";
import userRoutes from "./routes/users";
import paymentRoutes from "./routes/payments";
import complianceRoutes from "./routes/compliance";
import analyticsRoutes from "./routes/analytics";
import integrationRoutes from "./routes/integrations";
import enterpriseRoutes from "./routes/enterprise";
import notificationRoutes from "./routes/notifications";

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { authMiddleware } from "./middleware/auth";
import { rateLimitMiddleware } from "./middleware/rateLimit";
import { corsConfig } from "./config/cors";
import { helmetConfig } from "./config/security";

// Import services
import { NotificationService } from "./services/notifications/NotificationService";
import { AnalyticsService } from "./services/analytics/AnalyticsService";

// Import logger with fallback
let logger: any;
try {
  logger = require("./utils/logger").logger;
} catch (error) {
  logger = {
    info: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.log,
  };
}

dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: corsConfig,
});

// Basic middleware
app.use(helmet(helmetConfig));
app.use(cors(corsConfig));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// Custom middleware
app.use(requestLogger);
app.use(rateLimitMiddleware);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", authMiddleware, workspaceRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/payments", authMiddleware, paymentRoutes);
app.use("/api/compliance", authMiddleware, complianceRoutes);
app.use("/api/analytics", authMiddleware, analyticsRoutes);
app.use("/api/integrations", authMiddleware, integrationRoutes);
app.use("/api/enterprise", authMiddleware, enterpriseRoutes);
app.use("/api/notifications", authMiddleware, notificationRoutes);

// WebSocket handling
io.use((socket, next) => {
  // WebSocket authentication middleware
  const token = socket.handshake.auth.token;
  if (token) {
    // Verify token and attach user info to socket
    next();
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on("join-workspace", (workspaceId) => {
    socket.join(`workspace:${workspaceId}`);
    logger.info(`Socket ${socket.id} joined workspace ${workspaceId}`);
  });

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Initialize services with WebSocket support
const notificationService = new NotificationService(io);
const analyticsService = new AnalyticsService();

// Make services available globally
app.set("notificationService", notificationService);
app.set("analyticsService", analyticsService);
app.set("io", io);

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  logger.info(`🚀 Atlas Enterprise Backend Server running on port ${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
    process.exit(0);
  });
});

export default app;
export { io };
