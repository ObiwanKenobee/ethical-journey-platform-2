import express from "express";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { logger } from "../utils/logger";
import { ValidationError } from "../utils/errors";
import { NotificationService } from "../services/notifications/NotificationService";

const router = express.Router();

// Rate limiting for demo requests
const demoRequestLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 demo requests per windowMs
  message: {
    success: false,
    error: "Too many demo requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Demo request validation schema
const demoRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Valid email is required").max(100),
  company: z.string().min(1, "Company name is required").max(100),
  title: z.string().min(1, "Job title is required").max(100),
  phone: z.string().optional(),
  employees: z
    .enum(["1-50", "51-200", "201-1000", "1001-5000", "5000+"])
    .optional(),
  interests: z.array(z.string()).optional(),
  message: z.string().max(1000).optional(),
  preferredTime: z
    .enum(["morning", "afternoon", "evening", "flexible"])
    .optional(),
  source: z.string().optional(), // Track where the request came from
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

interface DemoRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  phone?: string;
  employees?: string;
  interests: string[];
  message?: string;
  preferredTime?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ipAddress: string;
  userAgent: string;
  status: "pending" | "contacted" | "scheduled" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage for demo requests (replace with database in production)
const demoRequests: Map<string, DemoRequest> = new Map();

// Helper function to calculate priority based on company size and interests
function calculatePriority(
  employees?: string,
  interests: string[] = [],
): "low" | "medium" | "high" | "urgent" {
  let score = 0;

  // Company size scoring
  if (employees === "5000+") score += 4;
  else if (employees === "1001-5000") score += 3;
  else if (employees === "201-1000") score += 2;
  else if (employees === "51-200") score += 1;

  // Interest scoring
  const highValueInterests = [
    "Enterprise Integration Hub",
    "Custom Enterprise Solutions",
    "Security & Compliance Center",
    "Multi-Tenant Workspace Management",
  ];

  const interestScore = interests.filter((interest) =>
    highValueInterests.includes(interest),
  ).length;

  score += interestScore;

  if (score >= 6) return "urgent";
  if (score >= 4) return "high";
  if (score >= 2) return "medium";
  return "low";
}

// Helper function to determine company tier for routing
function getCompanyTier(
  employees?: string,
): "startup" | "sme" | "enterprise" | "fortune500" {
  if (!employees) return "startup";

  switch (employees) {
    case "5000+":
      return "fortune500";
    case "1001-5000":
      return "enterprise";
    case "201-1000":
      return "enterprise";
    case "51-200":
      return "sme";
    default:
      return "startup";
  }
}

// POST /api/demo/request - Submit enterprise demo request
router.post("/request", demoRequestLimit, async (req, res) => {
  try {
    // Validate request body
    const validatedData = demoRequestSchema.parse(req.body);

    // Generate unique ID
    const id = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Calculate priority and company tier
    const priority = calculatePriority(
      validatedData.employees,
      validatedData.interests,
    );
    const companyTier = getCompanyTier(validatedData.employees);

    // Create demo request object
    const demoRequest: DemoRequest = {
      id,
      ...validatedData,
      interests: validatedData.interests || [],
      ipAddress: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
      status: "pending",
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store demo request
    demoRequests.set(id, demoRequest);

    // Send notifications
    try {
      const notificationService = new NotificationService();

      // Send confirmation email to requester
      await notificationService.sendDemoConfirmation({
        to: validatedData.email,
        firstName: validatedData.firstName,
        company: validatedData.company,
        demoId: id,
      });

      // Send internal notification to sales team
      await notificationService.sendInternalDemoAlert({
        demoRequest,
        companyTier,
        priority,
      });

      // For high-priority requests, send immediate alerts
      if (priority === "urgent" || priority === "high") {
        await notificationService.sendUrgentDemoAlert({
          demoRequest,
          priority,
        });
      }
    } catch (notificationError) {
      logger.error("Failed to send demo notifications:", notificationError);
      // Don't fail the request if notifications fail
    }

    // Log the demo request
    logger.info("Enterprise demo request submitted", {
      id,
      company: validatedData.company,
      email: validatedData.email,
      priority,
      companyTier,
      interests: validatedData.interests,
    });

    res.status(201).json({
      success: true,
      data: {
        id,
        status: "submitted",
        priority,
        expectedResponse:
          priority === "urgent"
            ? "2 hours"
            : priority === "high"
              ? "4 hours"
              : priority === "medium"
                ? "12 hours"
                : "24 hours",
        message:
          "Thank you for your interest! Our enterprise team will contact you soon.",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Demo request validation failed:", error.errors);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    logger.error("Failed to process demo request:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process demo request. Please try again later.",
    });
  }
});

// GET /api/demo/status/:id - Check demo request status
router.get("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const demoRequest = demoRequests.get(id);

    if (!demoRequest) {
      return res.status(404).json({
        success: false,
        error: "Demo request not found",
      });
    }

    // Return sanitized status information
    res.json({
      success: true,
      data: {
        id: demoRequest.id,
        status: demoRequest.status,
        priority: demoRequest.priority,
        scheduledDate: demoRequest.scheduledDate,
        createdAt: demoRequest.createdAt,
        company: demoRequest.company,
      },
    });
  } catch (error) {
    logger.error("Failed to get demo status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get demo status",
    });
  }
});

// GET /api/demo/requests - Get all demo requests (admin only)
router.get("/requests", async (req, res) => {
  try {
    // In production, add proper authentication middleware
    const { status, priority, companyTier, limit = 50, offset = 0 } = req.query;

    let filteredRequests = Array.from(demoRequests.values());

    // Apply filters
    if (status) {
      filteredRequests = filteredRequests.filter(
        (req) => req.status === status,
      );
    }

    if (priority) {
      filteredRequests = filteredRequests.filter(
        (req) => req.priority === priority,
      );
    }

    // Sort by priority and creation date
    filteredRequests.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff =
        priorityOrder[b.priority] - priorityOrder[a.priority];

      if (priorityDiff !== 0) return priorityDiff;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Apply pagination
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        requests: paginatedRequests,
        total: filteredRequests.length,
        limit: Number(limit),
        offset: Number(offset),
      },
    });
  } catch (error) {
    logger.error("Failed to get demo requests:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get demo requests",
    });
  }
});

// PUT /api/demo/requests/:id - Update demo request status (admin only)
router.put("/requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, scheduledDate, notes } = req.body;

    const demoRequest = demoRequests.get(id);

    if (!demoRequest) {
      return res.status(404).json({
        success: false,
        error: "Demo request not found",
      });
    }

    // Update demo request
    const updatedRequest = {
      ...demoRequest,
      ...(status && { status }),
      ...(assignedTo && { assignedTo }),
      ...(scheduledDate && { scheduledDate }),
      ...(notes && { notes }),
      updatedAt: new Date().toISOString(),
    };

    demoRequests.set(id, updatedRequest);

    // Send status update notification
    try {
      const notificationService = new NotificationService();

      if (status === "scheduled" && scheduledDate) {
        await notificationService.sendDemoScheduledNotification({
          to: demoRequest.email,
          firstName: demoRequest.firstName,
          scheduledDate,
          demoId: id,
        });
      }
    } catch (notificationError) {
      logger.error(
        "Failed to send status update notification:",
        notificationError,
      );
    }

    logger.info("Demo request updated", {
      id,
      status: updatedRequest.status,
      assignedTo: updatedRequest.assignedTo,
    });

    res.json({
      success: true,
      data: updatedRequest,
    });
  } catch (error) {
    logger.error("Failed to update demo request:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update demo request",
    });
  }
});

// GET /api/demo/analytics - Get demo request analytics (admin only)
router.get("/analytics", async (req, res) => {
  try {
    const requests = Array.from(demoRequests.values());

    // Calculate analytics
    const analytics = {
      total: requests.length,
      byStatus: {
        pending: requests.filter((r) => r.status === "pending").length,
        contacted: requests.filter((r) => r.status === "contacted").length,
        scheduled: requests.filter((r) => r.status === "scheduled").length,
        completed: requests.filter((r) => r.status === "completed").length,
        cancelled: requests.filter((r) => r.status === "cancelled").length,
      },
      byPriority: {
        urgent: requests.filter((r) => r.priority === "urgent").length,
        high: requests.filter((r) => r.priority === "high").length,
        medium: requests.filter((r) => r.priority === "medium").length,
        low: requests.filter((r) => r.priority === "low").length,
      },
      byCompanySize: {
        "1-50": requests.filter((r) => r.employees === "1-50").length,
        "51-200": requests.filter((r) => r.employees === "51-200").length,
        "201-1000": requests.filter((r) => r.employees === "201-1000").length,
        "1001-5000": requests.filter((r) => r.employees === "1001-5000").length,
        "5000+": requests.filter((r) => r.employees === "5000+").length,
      },
      conversionRate: {
        contactedToScheduled: calculateConversionRate(
          requests.filter((r) => r.status === "contacted").length,
          requests.filter((r) => r.status === "scheduled").length,
        ),
        scheduledToCompleted: calculateConversionRate(
          requests.filter((r) => r.status === "scheduled").length,
          requests.filter((r) => r.status === "completed").length,
        ),
      },
      averageResponseTime: calculateAverageResponseTime(requests),
      topInterests: calculateTopInterests(requests),
    };

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    logger.error("Failed to get demo analytics:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get demo analytics",
    });
  }
});

// Helper functions
function calculateConversionRate(from: number, to: number): number {
  return from > 0 ? Math.round((to / from) * 100) : 0;
}

function calculateAverageResponseTime(requests: DemoRequest[]): number {
  const respondedRequests = requests.filter(
    (r) => r.status !== "pending" && r.assignedTo,
  );

  if (respondedRequests.length === 0) return 0;

  const totalResponseTime = respondedRequests.reduce((sum, request) => {
    const createdTime = new Date(request.createdAt).getTime();
    const updatedTime = new Date(request.updatedAt).getTime();
    return sum + (updatedTime - createdTime);
  }, 0);

  return Math.round(
    totalResponseTime / respondedRequests.length / (1000 * 60 * 60),
  ); // in hours
}

function calculateTopInterests(
  requests: DemoRequest[],
): Array<{ interest: string; count: number }> {
  const interestCounts: Record<string, number> = {};

  requests.forEach((request) => {
    request.interests.forEach((interest) => {
      interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    });
  });

  return Object.entries(interestCounts)
    .map(([interest, count]) => ({ interest, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export default router;
