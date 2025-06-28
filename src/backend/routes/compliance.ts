import express from "express";
import { logger } from "../utils/logger";

const router = express.Router();

// Get compliance data
router.get("/", async (req, res) => {
  try {
    res.json({
      success: true,
      data: [],
      message: "Compliance endpoint working",
    });
  } catch (error) {
    logger.error("Get compliance failed:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to get compliance data",
    });
  }
});

export default router;
