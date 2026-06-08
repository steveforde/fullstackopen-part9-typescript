import express from "express";
import type { Response } from "express";
import patientService from "../services/patientService.js"; // Needs .js
import type { NonSensitivePatient } from "../types.js"; // Needs .js

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;
