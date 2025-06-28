import express from "express";
import { logger } from "../utils/logger";

const router = express.Router();

// Get workspaces
router.get("/", async (req, res) => {
  try {
    res.json({
      success: true,
      data: [],
      message: "Workspaces endpoint working",
    });
  } catch (error) {
    logger.error("Get workspaces failed:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get workspaces",
    });
  }
});

export default router;
