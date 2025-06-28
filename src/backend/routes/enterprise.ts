import express from "express";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { enterpriseService } from "../../services/enterprise.service";
import {
  requireRole,
  requirePermission,
  AuthenticatedRequest,
} from "../middleware/auth";
import { logger } from "../utils/logger";
import { ValidationError } from "../utils/errors";
import { enterpriseOnboardingService } from "../../services/enterprise-onboarding.service";

const router = express.Router();

// Rate limiting for public endpoints
const publicEndpointLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation schemas
const companyProfileSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  revenue: z.number().min(0, "Revenue must be positive"),
  employees: z.number().int().min(1, "Number of employees must be positive"),
  suppliers: z
    .number()
    .int()
    .min(0, "Number of suppliers must be non-negative"),
  regions: z.number().int().min(1, "Number of regions must be positive"),
  complianceFrameworks: z.array(z.string()).optional().default([]),
  currentTools: z.array(z.string()).optional().default([]),
  riskLevel: z.enum(["low", "medium", "high", "critical"]).default("medium"),
});

const roiAssumptionsSchema = z.object({
  auditCostPerSupplier: z.number().min(0),
  auditFrequency: z.number().min(0),
  complianceStaffCost: z.number().min(0),
  averageIncidentCost: z.number().min(0),
  incidentProbability: z.number().min(0).max(1),
  premiumBrandingUplift: z.number().min(0).max(1),
  discountRate: z.number().min(0).max(1),
  timeHorizon: z.number().int().min(1).max(10),
});

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
  interests: z.array(z.string()).optional().default([]),
  message: z.string().max(1000).optional(),
  preferredTime: z
    .enum(["morning", "afternoon", "evening", "flexible"])
    .optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

// Enterprise Onboarding Routes

// POST /api/enterprise/company-profile - Create company profile
router.post("/company-profile", publicEndpointLimit, async (req, res) => {
  try {
    const validatedData = companyProfileSchema.parse(req.body);

    const { data, error } =
      await enterpriseOnboardingService.createCompanyProfile(validatedData);

    if (error) {
      throw error;
    }

    logger.info("Company profile created", {
      id: data?.id,
      industry: validatedData.industry,
      revenue: validatedData.revenue,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Company profile validation failed:", error.errors);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    logger.error("Failed to create company profile:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create company profile",
    });
  }
});

// POST /api/enterprise/roi-calculation - Calculate and save ROI
router.post("/roi-calculation", publicEndpointLimit, async (req, res) => {
  try {
    const { companyProfile, assumptions } = req.body;

    // Validate inputs
    const validatedProfile = companyProfileSchema.parse(companyProfile);
    const validatedAssumptions = roiAssumptionsSchema.parse(assumptions);

    // Calculate ROI
    const calculation = enterpriseOnboardingService.calculateROI(
      validatedProfile,
      validatedAssumptions,
    );

    // Save calculation if company profile ID is provided
    if (companyProfile.id) {
      calculation.companyProfileId = companyProfile.id;
      const { error } =
        await enterpriseOnboardingService.saveROICalculation(calculation);

      if (error) {
        logger.warn("Failed to save ROI calculation:", error);
        // Continue with response even if save fails
      }
    }

    logger.info("ROI calculation completed", {
      companyProfileId: companyProfile.id,
      roi: calculation.roi,
      netBenefit: calculation.netBenefit,
    });

    res.json({
      success: true,
      data: calculation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("ROI calculation validation failed:", error.errors);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    logger.error("Failed to calculate ROI:", error);
    res.status(500).json({
      success: false,
      error: "Failed to calculate ROI",
    });
  }
});

// POST /api/enterprise/demo-request - Submit demo request
router.post("/demo-request", publicEndpointLimit, async (req, res) => {
  try {
    const validatedData = demoRequestSchema.parse(req.body);

    // Add request metadata
    const demoRequest = {
      ...validatedData,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    };

    const { data, error } =
      await enterpriseOnboardingService.createDemoRequest(demoRequest);

    if (error) {
      throw error;
    }

    logger.info("Demo request submitted", {
      id: data?.id,
      company: validatedData.company,
      email: validatedData.email,
      priority: data?.priority,
    });

    res.status(201).json({
      success: true,
      data: {
        id: data?.id,
        status: "submitted",
        priority: data?.priority,
        expectedResponse:
          data?.priority === "urgent"
            ? "2 hours"
            : data?.priority === "high"
              ? "4 hours"
              : data?.priority === "medium"
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
      error: "Failed to process demo request",
    });
  }
});

// GET /api/enterprise/industry-recommendations/:industry - Get industry-specific recommendations
router.get("/industry-recommendations/:industry", async (req, res) => {
  try {
    const { industry } = req.params;

    const recommendations =
      enterpriseOnboardingService.getIndustryRecommendations(industry);

    if (!recommendations) {
      return res.status(404).json({
        success: false,
        error: "Industry not found",
      });
    }

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    logger.error("Failed to get industry recommendations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get industry recommendations",
    });
  }
});

// GET /api/enterprise/onboarding-progress/:companyProfileId - Get onboarding progress
router.get("/onboarding-progress/:companyProfileId", async (req, res) => {
  try {
    const { companyProfileId } = req.params;

    const { data, error } =
      await enterpriseOnboardingService.getOnboardingProgress(companyProfileId);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    logger.error("Failed to get onboarding progress:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get onboarding progress",
    });
  }
});

// Workspace Management Routes
router.get(
  "/workspaces",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { data: workspaces, error } =
        await enterpriseService.getWorkspaces();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: workspaces,
      });
    } catch (error) {
      logger.error("Failed to get workspaces:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get workspaces",
      });
    }
  },
);

router.post(
  "/workspaces",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { name, slug, domain, plan, settings } = req.body;

      if (!name || !slug) {
        throw new ValidationError("Name and slug are required");
      }

      const { data: workspace, error } =
        await enterpriseService.createWorkspace({
          name,
          slug,
          domain,
          plan: plan || "starter",
          status: "active",
          settings: settings || {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: workspace,
      });
    } catch (error) {
      logger.error("Failed to create workspace:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create workspace",
      });
    }
  },
);

router.put(
  "/workspaces/:id",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body, updatedAt: new Date().toISOString() };

      const { data: workspace, error } =
        await enterpriseService.updateWorkspace(id, updates);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: workspace,
      });
    } catch (error) {
      logger.error("Failed to update workspace:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update workspace",
      });
    }
  },
);

router.post(
  "/workspaces/:id/suspend",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { error } = await enterpriseService.suspendWorkspace(id);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: "Workspace suspended successfully",
      });
    } catch (error) {
      logger.error("Failed to suspend workspace:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to suspend workspace",
      });
    }
  },
);

// User Management Routes
router.get(
  "/users",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { status, role, workspace } = req.query;

      const filters = {
        status: status as string,
        role: role as string,
        workspace: workspace as string,
      };

      const { data: users, error } =
        await enterpriseService.getGlobalUsers(filters);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      logger.error("Failed to get users:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get users",
      });
    }
  },
);

router.put(
  "/users/:id/role",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!role || !["superadmin", "admin", "user"].includes(role)) {
        throw new ValidationError(
          "Valid role is required (superadmin, admin, user)",
        );
      }

      const { error } = await enterpriseService.updateUserGlobalRole(id, role);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: "User role updated successfully",
      });
    } catch (error) {
      logger.error("Failed to update user role:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update user role",
      });
    }
  },
);

router.post(
  "/users/:id/suspend",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { error } = await enterpriseService.suspendUser(id);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: "User suspended successfully",
      });
    } catch (error) {
      logger.error("Failed to suspend user:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to suspend user",
      });
    }
  },
);

// Platform Metrics Routes
router.get(
  "/metrics",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { data: metrics, error } =
        await enterpriseService.getPlatformMetrics();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: metrics,
      });
    } catch (error) {
      logger.error("Failed to get platform metrics:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get platform metrics",
      });
    }
  },
);

// Security & Audit Routes
router.get(
  "/security/events",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { severity, type, status } = req.query;

      const filters = {
        severity: severity as string,
        type: type as string,
        status: status as string,
      };

      const { data: events, error } =
        await enterpriseService.getSecurityEvents(filters);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      logger.error("Failed to get security events:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get security events",
      });
    }
  },
);

router.post(
  "/security/events",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const {
        type,
        severity,
        description,
        userId,
        workspaceId,
        ipAddress,
        userAgent,
      } = req.body;

      if (!type || !severity || !description) {
        throw new ValidationError(
          "Type, severity, and description are required",
        );
      }

      const { data: event, error } =
        await enterpriseService.createSecurityEvent({
          type,
          severity,
          description,
          userId,
          workspaceId,
          ipAddress: ipAddress || req.ip,
          userAgent: userAgent || req.headers["user-agent"] || "",
          status: "open",
        });

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: event,
      });
    } catch (error) {
      logger.error("Failed to create security event:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create security event",
      });
    }
  },
);

router.get(
  "/audit/logs",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { userId, workspaceId, action } = req.query;

      const filters = {
        userId: userId as string,
        workspaceId: workspaceId as string,
        action: action as string,
      };

      const { data: logs, error } =
        await enterpriseService.getAuditLogs(filters);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: logs,
      });
    } catch (error) {
      logger.error("Failed to get audit logs:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get audit logs",
      });
    }
  },
);

// Compliance Routes
router.get(
  "/compliance/reports",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { workspaceId } = req.query;

      const { data: reports, error } =
        await enterpriseService.getComplianceReports(workspaceId as string);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: reports,
      });
    } catch (error) {
      logger.error("Failed to get compliance reports:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get compliance reports",
      });
    }
  },
);

router.post(
  "/compliance/reports",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { workspaceId, framework } = req.body;

      if (!workspaceId || !framework) {
        throw new ValidationError("Workspace ID and framework are required");
      }

      const { data: report, error } =
        await enterpriseService.generateComplianceReport(
          workspaceId,
          framework,
        );

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: report,
      });
    } catch (error) {
      logger.error("Failed to generate compliance report:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate compliance report",
      });
    }
  },
);

// System Health Routes
router.get(
  "/system/health",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { data: health, error } = await enterpriseService.getSystemHealth();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: health,
      });
    } catch (error) {
      logger.error("Failed to get system health:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get system health",
      });
    }
  },
);

router.put(
  "/system/health/:service",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { service } = req.params;
      const healthData = req.body;

      const { error } = await enterpriseService.updateSystemHealth(
        service,
        healthData,
      );

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: "System health updated successfully",
      });
    } catch (error) {
      logger.error("Failed to update system health:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update system health",
      });
    }
  },
);

// Data Management Routes
router.get(
  "/data/retention-policies",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { data: policies, error } =
        await enterpriseService.getDataRetentionPolicies();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: policies,
      });
    } catch (error) {
      logger.error("Failed to get data retention policies:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get data retention policies",
      });
    }
  },
);

router.post(
  "/data/retention-policies",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const policyData = req.body;

      if (
        !policyData.name ||
        !policyData.dataType ||
        !policyData.retentionPeriod
      ) {
        throw new ValidationError(
          "Name, data type, and retention period are required",
        );
      }

      const { data: policy, error } =
        await enterpriseService.createDataRetentionPolicy(policyData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: policy,
      });
    } catch (error) {
      logger.error("Failed to create data retention policy:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create data retention policy",
      });
    }
  },
);

router.post(
  "/data/retention/:policyId/execute",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { policyId } = req.params;

      const result = await enterpriseService.executeDataRetention(policyId);

      if (result.error) {
        throw result.error;
      }

      res.json({
        success: true,
        data: {
          deletedRecords: result.deletedRecords,
          archivedRecords: result.archivedRecords,
        },
      });
    } catch (error) {
      logger.error("Failed to execute data retention:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to execute data retention",
      });
    }
  },
);

// Analytics Routes
router.get(
  "/analytics",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { timeRange = "30d" } = req.query;

      const { data: analytics, error } =
        await enterpriseService.getGlobalAnalytics(timeRange as string);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      logger.error("Failed to get global analytics:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get global analytics",
      });
    }
  },
);

// Configuration Routes
router.get(
  "/configuration",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { data: config, error } =
        await enterpriseService.getGlobalConfiguration();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: config,
      });
    } catch (error) {
      logger.error("Failed to get global configuration:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get global configuration",
      });
    }
  },
);

router.put(
  "/configuration",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const config = req.body;

      const { error } =
        await enterpriseService.updateGlobalConfiguration(config);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: "Global configuration updated successfully",
      });
    } catch (error) {
      logger.error("Failed to update global configuration:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update global configuration",
      });
    }
  },
);

// Backup & Recovery Routes
router.post(
  "/backups",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { type = "full", workspaceId } = req.body;

      if (!["full", "incremental"].includes(type)) {
        throw new ValidationError(
          'Backup type must be "full" or "incremental"',
        );
      }

      const result = await enterpriseService.createBackup(type, workspaceId);

      if (result.error) {
        throw result.error;
      }

      res.status(201).json({
        success: true,
        data: { backupId: result.backupId },
      });
    } catch (error) {
      logger.error("Failed to create backup:", error);
      res.status(error instanceof ValidationError ? 400 : 500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create backup",
      });
    }
  },
);

router.get(
  "/backups",
  requireRole(["superadmin", "admin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { workspaceId } = req.query;

      const { data: backups, error } = await enterpriseService.getBackups(
        workspaceId as string,
      );

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: backups,
      });
    } catch (error) {
      logger.error("Failed to get backups:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get backups",
      });
    }
  },
);

router.post(
  "/backups/:backupId/restore",
  requireRole(["superadmin"]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { backupId } = req.params;

      const result = await enterpriseService.restoreBackup(backupId);

      if (result.error) {
        throw result.error;
      }

      res.json({
        success: true,
        data: { restoreId: result.restoreId },
      });
    } catch (error) {
      logger.error("Failed to restore backup:", error);
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to restore backup",
      });
    }
  },
);

export default router;
