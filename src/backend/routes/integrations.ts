import express from "express";
import { logger } from "../utils/logger";

const router = express.Router();

// Get integrations
router.get("/", async (req, res) => {
  try {
    res.json({
      success: true,
      data: [],
      message: "Integrations endpoint working",
    });
  } catch (error) {
    logger.error("Get integrations failed:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get integrations",
    });
  }
});

export default router;
