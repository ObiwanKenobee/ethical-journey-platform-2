export class ValidationError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.code = "VALIDATION_ERROR";
    this.details = details;
  }
}

export class AuthenticationError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string = "Authentication required") {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
    this.code = "AUTHENTICATION_ERROR";
  }
}

export class AuthorizationError extends Error {
  public statusCode: number;
  public code: string;
  public requiredPermissions?: string[];

  constructor(
    message: string = "Insufficient permissions",
    requiredPermissions?: string[],
  ) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = 403;
    this.code = "AUTHORIZATION_ERROR";
    this.requiredPermissions = requiredPermissions;
  }
}

export class NotFoundError extends Error {
  public statusCode: number;
  public code: string;
  public resource?: string;

  constructor(message: string = "Resource not found", resource?: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.code = "NOT_FOUND_ERROR";
    this.resource = resource;
  }
}

export class ConflictError extends Error {
  public statusCode: number;
  public code: string;
  public conflictField?: string;

  constructor(message: string = "Resource conflict", conflictField?: string) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
    this.code = "CONFLICT_ERROR";
    this.conflictField = conflictField;
  }
}

export class RateLimitError extends Error {
  public statusCode: number;
  public code: string;
  public retryAfter?: number;

  constructor(message: string = "Rate limit exceeded", retryAfter?: number) {
    super(message);
    this.name = "RateLimitError";
    this.statusCode = 429;
    this.code = "RATE_LIMIT_ERROR";
    this.retryAfter = retryAfter;
  }
}

export class ExternalServiceError extends Error {
  public statusCode: number;
  public code: string;
  public service?: string;
  public originalError?: Error;

  constructor(message: string, service?: string, originalError?: Error) {
    super(message);
    this.name = "ExternalServiceError";
    this.statusCode = 502;
    this.code = "EXTERNAL_SERVICE_ERROR";
    this.service = service;
    this.originalError = originalError;
  }
}

export class DatabaseError extends Error {
  public statusCode: number;
  public code: string;
  public query?: string;
  public params?: any;

  constructor(message: string, query?: string, params?: any) {
    super(message);
    this.name = "DatabaseError";
    this.statusCode = 500;
    this.code = "DATABASE_ERROR";
    this.query = query;
    this.params = params;
  }
}

export class PaymentError extends Error {
  public statusCode: number;
  public code: string;
  public provider?: string;
  public providerError?: any;

  constructor(message: string, provider?: string, providerError?: any) {
    super(message);
    this.name = "PaymentError";
    this.statusCode = 402;
    this.code = "PAYMENT_ERROR";
    this.provider = provider;
    this.providerError = providerError;
  }
}

export class WorkspaceError extends Error {
  public statusCode: number;
  public code: string;
  public workspaceId?: string;

  constructor(message: string, workspaceId?: string) {
    super(message);
    this.name = "WorkspaceError";
    this.statusCode = 403;
    this.code = "WORKSPACE_ERROR";
    this.workspaceId = workspaceId;
  }
}

export class ComplianceError extends Error {
  public statusCode: number;
  public code: string;
  public framework?: string;
  public violations?: string[];

  constructor(message: string, framework?: string, violations?: string[]) {
    super(message);
    this.name = "ComplianceError";
    this.statusCode = 422;
    this.code = "COMPLIANCE_ERROR";
    this.framework = framework;
    this.violations = violations;
  }
}

// Error factory functions for common scenarios
export const createValidationError = (field: string, message: string) => {
  return new ValidationError(
    `Validation failed for field '${field}': ${message}`,
    { field },
  );
};

export const createNotFoundError = (resource: string, id?: string) => {
  const message = id
    ? `${resource} with ID '${id}' not found`
    : `${resource} not found`;
  return new NotFoundError(message, resource);
};

export const createConflictError = (
  resource: string,
  field: string,
  value: string,
) => {
  return new ConflictError(
    `${resource} with ${field} '${value}' already exists`,
    field,
  );
};

export const createAuthorizationError = (requiredPermissions: string[]) => {
  return new AuthorizationError(
    `Access denied. Required permissions: ${requiredPermissions.join(", ")}`,
    requiredPermissions,
  );
};

export const createPaymentError = (
  provider: string,
  message: string,
  originalError?: any,
) => {
  return new PaymentError(
    `Payment failed (${provider}): ${message}`,
    provider,
    originalError,
  );
};

// Error response formatter
export const formatErrorResponse = (error: Error) => {
  const baseResponse = {
    success: false,
    error: error.message,
    timestamp: new Date().toISOString(),
  };

  // Add specific error details based on error type
  if (error instanceof ValidationError) {
    return {
      ...baseResponse,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof AuthorizationError) {
    return {
      ...baseResponse,
      code: error.code,
      requiredPermissions: error.requiredPermissions,
    };
  }

  if (error instanceof NotFoundError) {
    return {
      ...baseResponse,
      code: error.code,
      resource: error.resource,
    };
  }

  if (error instanceof ConflictError) {
    return {
      ...baseResponse,
      code: error.code,
      conflictField: error.conflictField,
    };
  }

  if (error instanceof RateLimitError) {
    return {
      ...baseResponse,
      code: error.code,
      retryAfter: error.retryAfter,
    };
  }

  if (error instanceof PaymentError) {
    return {
      ...baseResponse,
      code: error.code,
      provider: error.provider,
      providerError: error.providerError,
    };
  }

  if (error instanceof WorkspaceError) {
    return {
      ...baseResponse,
      code: error.code,
      workspaceId: error.workspaceId,
    };
  }

  if (error instanceof ComplianceError) {
    return {
      ...baseResponse,
      code: error.code,
      framework: error.framework,
      violations: error.violations,
    };
  }

  if (error instanceof ExternalServiceError) {
    return {
      ...baseResponse,
      code: error.code,
      service: error.service,
    };
  }

  if (error instanceof DatabaseError) {
    return {
      ...baseResponse,
      code: error.code,
      // Don't expose sensitive database details in production
      ...(process.env.NODE_ENV !== "production" && {
        query: error.query,
        params: error.params,
      }),
    };
  }

  // Default error response
  return {
    ...baseResponse,
    code: "INTERNAL_ERROR",
  };
};

// Helper function to determine if error should be logged as warning or error
export const getErrorLogLevel = (error: Error): "warn" | "error" => {
  if (
    error instanceof ValidationError ||
    error instanceof AuthenticationError ||
    error instanceof AuthorizationError ||
    error instanceof NotFoundError ||
    error instanceof ConflictError ||
    error instanceof RateLimitError
  ) {
    return "warn"; // These are expected client errors
  }

  return "error"; // These are unexpected server errors
};

// Error code mapping for client-side handling
export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  CONFLICT_ERROR: "CONFLICT_ERROR",
  RATE_LIMIT_ERROR: "RATE_LIMIT_ERROR",
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  PAYMENT_ERROR: "PAYMENT_ERROR",
  WORKSPACE_ERROR: "WORKSPACE_ERROR",
  COMPLIANCE_ERROR: "COMPLIANCE_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
