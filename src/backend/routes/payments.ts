import express from "express";
import { paymentService } from "../services/payments/PaymentService";
import {
  requireRole,
  requirePermission,
  AuthenticatedRequest,
} from "../middleware/auth";
import { logger } from "../utils/logger";
import { ValidationError } from "../utils/errors";

const router = express.Router();

// Create payment intent
router.post(
  "/intents",
  requirePermission(["billing:write", "payments:create"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { amount, currency, provider, metadata } = req.body;

      if (!amount || amount <= 0) {
        throw new ValidationError("Amount must be greater than 0");
      }

      if (
        !provider ||
        !["stripe", "paystack", "flutterwave"].includes(provider)
      ) {
        throw new ValidationError(
          "Valid payment provider is required (stripe, paystack, flutterwave)",
        );
      }

      const paymentIntent = await paymentService.createPaymentIntent({
        amount,
        currency: currency || "USD",
        provider,
        customerId: req.user!.id,
        workspaceId: req.user!.workspaceId,
        metadata: {
          userId: req.user!.id,
          userEmail: req.user!.email,
          ...metadata,
        },
      });

      res.status(201).json({
        success: true,
        data: paymentIntent,
      });
    } catch (error) {
      logger.error("Failed to create payment intent:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create payment intent",
      });
    }
  },
);

// Confirm payment intent
router.post(
  "/intents/:id/confirm",
  requirePermission(["billing:write", "payments:create"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { paymentMethodId } = req.body;

      const paymentIntent = await paymentService.confirmPaymentIntent(
        id,
        paymentMethodId,
      );

      res.json({
        success: true,
        data: paymentIntent,
      });
    } catch (error) {
      logger.error("Failed to confirm payment intent:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to confirm payment intent",
      });
    }
  },
);

// Get payment intent
router.get(
  "/intents/:id",
  requirePermission(["billing:read", "payments:read"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const paymentIntent = await paymentService.getPaymentIntent(id);

      if (!paymentIntent) {
        return res.status(404).json({
          success: false,
          error: "Payment intent not found",
        });
      }

      res.json({
        success: true,
        data: paymentIntent,
      });
    } catch (error) {
      logger.error("Failed to get payment intent:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get payment intent",
      });
    }
  },
);

// Create subscription
router.post(
  "/subscriptions",
  requirePermission(["billing:write", "subscriptions:create"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { planId, provider, paymentMethodId, trialPeriodDays } = req.body;

      if (!planId) {
        throw new ValidationError("Plan ID is required");
      }

      if (
        !provider ||
        !["stripe", "paystack", "flutterwave"].includes(provider)
      ) {
        throw new ValidationError("Valid payment provider is required");
      }

      const subscription = await paymentService.createSubscription({
        customerId: req.user!.id,
        workspaceId: req.user!.workspaceId!,
        planId,
        provider,
        status: "active",
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(), // 30 days from now
        trialEnd: trialPeriodDays
          ? new Date(
              Date.now() + trialPeriodDays * 24 * 60 * 60 * 1000,
            ).toISOString()
          : undefined,
        cancelAtPeriodEnd: false,
        providerSubscriptionId: "",
        metadata: {
          userId: req.user!.id,
          paymentMethodId,
        },
      });

      res.status(201).json({
        success: true,
        data: subscription,
      });
    } catch (error) {
      logger.error("Failed to create subscription:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create subscription",
      });
    }
  },
);

// Cancel subscription
router.post(
  "/subscriptions/:id/cancel",
  requirePermission(["billing:write", "subscriptions:write"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { cancelAtPeriodEnd = false } = req.body;

      const subscription = await paymentService.cancelSubscription(
        id,
        cancelAtPeriodEnd,
      );

      res.json({
        success: true,
        data: subscription,
      });
    } catch (error) {
      logger.error("Failed to cancel subscription:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to cancel subscription",
      });
    }
  },
);

// Get subscription
router.get(
  "/subscriptions/:id",
  requirePermission(["billing:read", "subscriptions:read"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const subscription = await paymentService.getSubscription(id);

      if (!subscription) {
        return res.status(404).json({
          success: false,
          error: "Subscription not found",
        });
      }

      res.json({
        success: true,
        data: subscription,
      });
    } catch (error) {
      logger.error("Failed to get subscription:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get subscription",
      });
    }
  },
);

// Add payment method
router.post(
  "/payment-methods",
  requirePermission(["billing:write", "payments:create"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { provider, type, ...methodData } = req.body;

      if (
        !provider ||
        !["stripe", "paystack", "flutterwave"].includes(provider)
      ) {
        throw new ValidationError("Valid payment provider is required");
      }

      const paymentMethod = await paymentService.addPaymentMethod(
        req.user!.id,
        provider,
        {
          type: type || "card",
          ...methodData,
        },
      );

      res.status(201).json({
        success: true,
        data: paymentMethod,
      });
    } catch (error) {
      logger.error("Failed to add payment method:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to add payment method",
      });
    }
  },
);

// Get invoices
router.get(
  "/invoices",
  requirePermission(["billing:read", "invoices:read"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { subscriptionId } = req.query;

      const invoices = await paymentService.getInvoices(
        req.user!.id,
        subscriptionId as string,
      );

      res.json({
        success: true,
        data: invoices,
      });
    } catch (error) {
      logger.error("Failed to get invoices:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get invoices",
      });
    }
  },
);

// Create refund
router.post(
  "/refunds",
  requireRole(["admin", "superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { paymentIntentId, amount, reason } = req.body;

      if (!paymentIntentId) {
        throw new ValidationError("Payment intent ID is required");
      }

      const refund = await paymentService.createRefund(
        paymentIntentId,
        amount,
        reason,
      );

      res.status(201).json({
        success: true,
        data: refund,
      });
    } catch (error) {
      logger.error("Failed to create refund:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create refund",
      });
    }
  },
);

// Get payment analytics
router.get(
  "/analytics",
  requirePermission(["billing:read", "analytics:read"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { timeRange = "30d" } = req.query;

      const analytics = await paymentService.getPaymentAnalytics(
        req.user!.workspaceId,
        timeRange as string,
      );

      res.json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      logger.error("Failed to get payment analytics:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get payment analytics",
      });
    }
  },
);

// Webhook endpoints for each provider
router.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["stripe-signature"] as string;

      if (!signature) {
        return res.status(400).json({
          success: false,
          error: "Missing stripe-signature header",
        });
      }

      const result = await paymentService.handleWebhook(
        "stripe",
        req.body,
        signature,
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error("Stripe webhook error:", error);
      res.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Webhook processing failed",
      });
    }
  },
);

router.post("/webhooks/paystack", async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"] as string;

    if (!signature) {
      return res.status(400).json({
        success: false,
        error: "Missing x-paystack-signature header",
      });
    }

    const result = await paymentService.handleWebhook(
      "paystack",
      req.body,
      signature,
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error("Paystack webhook error:", error);
    res.status(400).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Webhook processing failed",
    });
  }
});

router.post("/webhooks/flutterwave", async (req, res) => {
  try {
    const signature = req.headers["verif-hash"] as string;

    if (!signature) {
      return res.status(400).json({
        success: false,
        error: "Missing verif-hash header",
      });
    }

    const result = await paymentService.handleWebhook(
      "flutterwave",
      req.body,
      signature,
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error("Flutterwave webhook error:", error);
    res.status(400).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Webhook processing failed",
    });
  }
});

// Health check for payment providers
router.get("/health", async (req, res) => {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      providers: {
        stripe: process.env.STRIPE_SECRET_KEY ? "configured" : "not_configured",
        paystack: process.env.PAYSTACK_SECRET_KEY
          ? "configured"
          : "not_configured",
        flutterwave: process.env.FLUTTERWAVE_SECRET_KEY
          ? "configured"
          : "not_configured",
      },
    };

    res.json(health);
  } catch (error) {
    logger.error("Payment health check failed:", error);
    res.status(500).json({
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Health check failed",
    });
  }
});

export default router;
