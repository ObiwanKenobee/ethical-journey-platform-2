import { HelmetOptions } from "helmet";

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://api.stripe.com",
        "https://api.paystack.co",
        "https://api.flutterwave.com",
        "https://*.supabase.co",
        process.env.SUPABASE_URL,
      ].filter(Boolean),
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      formAction: ["'self'"],
      upgradeInsecureRequests:
        process.env.NODE_ENV === "production" ? [] : null,
    },
  },
  hsts:
    process.env.NODE_ENV === "production"
      ? {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        }
      : false,
  crossOriginEmbedderPolicy: false, // Disable for API
  crossOriginResourcePolicy: {
    policy: "cross-origin",
  },
};
