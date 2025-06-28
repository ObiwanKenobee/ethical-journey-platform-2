import express from "express";
import { logger } from "../utils/logger";

const router = express.Router();

// Get users
router.get("/", async (req, res) => {
  try {
    res.json({
      success: true,
      data: [],
      message: "Users endpoint working",
    });
  } catch (error) {
    logger.error("Get users failed:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to get users",
    });
  }
});

export default router;
