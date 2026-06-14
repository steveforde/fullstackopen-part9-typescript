import express, { type Response } from "express";
import diagnosisService from "../services/diagnosisService.js";
import type { Diagnosis } from "../types.js";

// Initialize an isolated Express Router instance for modular diagnosis endpoint routing
const router = express.Router();

/**
 * @route   GET /api/diagnoses
 * @desc    Fetch a comprehensive list of all medical diagnosis codes and definitions
 * @access  Public
 * @returns {Response<Diagnosis[]>} Express response payload strongly typed to an array of Diagnosis objects
 */
router.get("/", (_req, res: Response<Diagnosis[]>) => {
  // Delegate the data extraction logic directly to the isolated diagnosis service layer
  res.send(diagnosisService.getEntries());
});

export default router;
