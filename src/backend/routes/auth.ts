import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  updatePassword,
  ensureUserProfile,
} from "../../services/auth.service";
import { saveOnboardingData } from "../../services/user.service";
import { authRateLimit } from "../middleware/rateLimit";
import { logger } from "../utils/logger";
import { ValidationError } from "../utils/errors";

const router = express.Router();

// Apply auth rate limiting to all auth routes
router.use(authRateLimit);

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, company, role, archetype } = req.body;

    // Validation
    if (!email || !password || !name || !role) {
      throw new ValidationError("Email, password, name, and role are required");
    }

    if (password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    const userData = {
      email: email.trim(),
      password,
      name: name.trim(),
      company: company?.trim(),
      role,
      archetype,
    };

    const { user, error } = await registerUser(userData);

    if (error) {
      throw error;
    }

    logger.info("User registered successfully", {
      userId: user?.id,
      email: userData.email,
      role: userData.role,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user?.id,
        email: user?.email,
        role: userData.role,
      },
    });
  } catch (error) {
    logger.error("Registration failed:", error);

    const statusCode = error instanceof ValidationError ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    const { user, error } = await loginUser({ email, password });

    if (error) {
      throw new Error("Invalid email or password");
    }

    if (!user) {
      throw new Error("Login failed");
    }

    // Ensure user profile exists
    try {
      await ensureUserProfile(user);
    } catch (profileError) {
      logger.warn("Failed to ensure user profile:", profileError);
      // Continue with login even if profile creation fails
    }

    logger.info("User logged in successfully", {
      userId: user.id,
      email: user.email,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error("Login failed:", error);

    res.status(401).json({
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    const { error } = await logoutUser();

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    logger.error("Logout failed:", error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Logout failed",
    });
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ValidationError("Email is required");
    }

    const { success, error } = await resetPassword(email);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    logger.error("Password reset failed:", error);

    const statusCode = error instanceof ValidationError ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      error: error instanceof Error ? error.message : "Password reset failed",
    });
  }
});

// Update password
router.post("/update-password", async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      throw new ValidationError("New password is required");
    }

    if (newPassword.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    const { success, error } = await updatePassword(newPassword);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    logger.error("Password update failed:", error);

    const statusCode = error instanceof ValidationError ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      error: error instanceof Error ? error.message : "Password update failed",
    });
  }
});

// Save onboarding data
router.post("/onboarding", async (req, res) => {
  try {
    const { userId, role, archetype, ...otherData } = req.body;

    if (!userId || !role) {
      throw new ValidationError("User ID and role are required");
    }

    const { success, error } = await saveOnboardingData(userId, {
      role,
      archetype,
      ...otherData,
    });

    if (error) {
      throw error;
    }

    logger.info("Onboarding data saved successfully", {
      userId,
      role,
      archetype,
    });

    res.json({
      success: true,
      message: "Onboarding completed successfully",
    });
  } catch (error) {
    logger.error("Onboarding failed:", error);

    const statusCode = error instanceof ValidationError ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      error: error instanceof Error ? error.message : "Onboarding failed",
    });
  }
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    // This would typically use auth middleware to get user from token
    // For now, we'll return a simple response
    res.json({
      success: true,
      message: "Auth endpoint working",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("Get current user failed:", error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to get user data",
    });
  }
});

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "auth",
    timestamp: new Date().toISOString(),
  });
});

export default router;
