import { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://atlas.com",
  "https://www.atlas.com",
  "https://app.atlas.com",
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow localhost in development
    if (
      process.env.NODE_ENV === "development" &&
      origin.includes("localhost")
    ) {
      return callback(null, true);
    }

    // Reject all other origins
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Request-ID",
    "X-API-Key",
    "stripe-signature",
    "x-paystack-signature",
    "verif-hash",
  ],
  exposedHeaders: [
    "X-Request-ID",
    "X-RateLimit-Limit",
    "X-RateLimit-Remaining",
    "X-RateLimit-Reset",
  ],
  optionsSuccessStatus: 200,
  preflightContinue: false,
};
