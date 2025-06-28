import express from "express";
import { logger } from "../utils/logger";

const router = express.Router();

// Get analytics
router.get("/", async (req, res) => {
  try {
    res.json({
      success: true,
      data: {},
      message: "Analytics endpoint working",
    });
  } catch (error) {
    logger.error("Get analytics failed:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to get analytics",
    });
  }
});

export default router;
