import express, { type Response } from "express";
import diagnosisService from "../services/diagnosisService";
import type { Diagnosis } from "../types";

const router = express.Router();

// Fetch all diagnoses safely locked down to the Diagnosis array type
router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;
