import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { supabaseService } from "../config/database";
import { logger } from "../utils/logger";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    workspaceId?: string;
    permissions?: string[];
    archetype?: string;
  };
  workspace?: {
    id: string;
    name: string;
    plan: string;
    status: string;
  };
}

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  workspaceId?: string;
  archetype?: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "Unauthorized",
        message: "No valid authorization token provided",
        code: "MISSING_TOKEN",
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      res.status(401).json({
        error: "Unauthorized",
        message: "Token is required",
        code: "MISSING_TOKEN",
      });
      return;
    }

    // Verify JWT token
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    let payload: JWTPayload;

    try {
      payload = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (jwtError) {
      logger.warn("Invalid JWT token:", jwtError);
      res.status(401).json({
        error: "Unauthorized",
        message: "Invalid or expired token",
        code: "INVALID_TOKEN",
      });
      return;
    }

    // Fetch user from database to ensure they still exist and are active
    const { data: user, error: userError } = await supabaseService
      .from("users")
      .select(
        `
        id,
        email,
        status,
        global_role,
        archetype,
        last_active,
        user_workspaces (
          workspace_id,
          role,
          permissions,
          workspaces (
            id,
            name,
            plan,
            status
          )
        )
      `,
      )
      .eq("id", payload.userId)
      .eq("status", "active")
      .single();

    if (userError || !user) {
      logger.warn(`User not found or inactive: ${payload.userId}`);
      res.status(401).json({
        error: "Unauthorized",
        message: "User not found or account deactivated",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    // Update last active timestamp
    await supabaseService
      .from("users")
      .update({ last_active: new Date().toISOString() })
      .eq("id", user.id);

    // Set user information in request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.global_role,
      archetype: user.archetype,
      permissions: [],
    };

    // Handle workspace-specific context
    if (payload.workspaceId) {
      const userWorkspace = user.user_workspaces?.find(
        (uw: any) => uw.workspace_id === payload.workspaceId,
      );

      if (userWorkspace && userWorkspace.workspaces) {
        req.workspace = {
          id: userWorkspace.workspace_id,
          name: userWorkspace.workspaces.name,
          plan: userWorkspace.workspaces.plan,
          status: userWorkspace.workspaces.status,
        };

        req.user.workspaceId = userWorkspace.workspace_id;
        req.user.permissions = userWorkspace.permissions || [];

        // Override role with workspace-specific role if available
        if (userWorkspace.role) {
          req.user.role = userWorkspace.role;
        }
      }
    }

    // Log successful authentication
    logger.info(`User authenticated: ${user.email} (${user.id})`);

    next();
  } catch (error) {
    logger.error("Authentication middleware error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Authentication failed due to server error",
      code: "AUTH_ERROR",
    });
  }
};

export const requireRole = (requiredRoles: string | string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized",
        message: "Authentication required",
        code: "AUTH_REQUIRED",
      });
      return;
    }

    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        error: "Forbidden",
        message: `Insufficient permissions. Required role: ${roles.join(" or ")}`,
        code: "INSUFFICIENT_ROLE",
        required: roles,
        current: req.user.role,
      });
      return;
    }

    next();
  };
};

export const requirePermission = (requiredPermissions: string | string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized",
        message: "Authentication required",
        code: "AUTH_REQUIRED",
      });
      return;
    }

    const permissions = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];
    const userPermissions = req.user.permissions || [];

    const hasPermission = permissions.some(
      (permission) =>
        userPermissions.includes(permission) || userPermissions.includes("*"),
    );

    if (!hasPermission) {
      res.status(403).json({
        error: "Forbidden",
        message: `Insufficient permissions. Required: ${permissions.join(" or ")}`,
        code: "INSUFFICIENT_PERMISSIONS",
        required: permissions,
        current: userPermissions,
      });
      return;
    }

    next();
  };
};

export const requireWorkspace = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.workspace) {
    res.status(400).json({
      error: "Bad Request",
      message: "Workspace context required for this operation",
      code: "WORKSPACE_REQUIRED",
    });
    return;
  }

  if (req.workspace.status !== "active") {
    res.status(403).json({
      error: "Forbidden",
      message: `Workspace is ${req.workspace.status}`,
      code: "WORKSPACE_INACTIVE",
      workspaceStatus: req.workspace.status,
    });
    return;
  }

  next();
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // No auth provided, continue without user context
      next();
      return;
    }

    // Try to authenticate, but don't fail if it doesn't work
    await authMiddleware(req, res, (error?: any) => {
      if (error) {
        // Log the error but continue without authentication
        logger.warn("Optional auth failed:", error);
      }
      next();
    });
  } catch (error) {
    // Log error but continue without authentication
    logger.warn("Optional auth error:", error);
    next();
  }
};

export const createToken = (user: any, workspaceId?: string): string => {
  const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  const payload: Omit<JWTPayload, "iat" | "exp"> = {
    userId: user.id,
    email: user.email,
    role: user.global_role || user.role,
    archetype: user.archetype,
  };

  if (workspaceId) {
    payload.workspaceId = workspaceId;
  }

  return jwt.sign(payload, jwtSecret, { expiresIn });
};

export const verifyToken = (token: string): JWTPayload => {
  const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
  return jwt.verify(token, jwtSecret) as JWTPayload;
};

// Middleware to log API usage for analytics
export const logApiUsage = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const startTime = Date.now();

  // Override res.end to capture response details
  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any): void {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log API usage
    const apiLog = {
      userId: req.user?.id,
      workspaceId: req.user?.workspaceId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      timestamp: new Date().toISOString(),
    };

    // Async log to database (don't wait for it)
    supabaseService
      .from("api_usage_logs")
      .insert([apiLog])
      .catch((error) => {
        logger.error("Failed to log API usage:", error);
      });

    // Call original end method
    originalEnd.call(this, chunk, encoding);
  };

  next();
};

export type { AuthenticatedRequest };
