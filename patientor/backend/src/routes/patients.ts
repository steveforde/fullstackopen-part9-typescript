import express, { Response } from "express";
import patientService from "../services/patientService.js";
import { toNewPatientEntry } from "../utils.js";
import { Patient, NewPatientEntry, NewPatient } from "../types.js";
import { z } from "zod";

// Initialize an isolated Express Router instance for modular patient endpoint handling
const router = express.Router();

/**
 * @route   GET /api/patients
 * @desc    Get all patient records with sensitive data fields (ssn, entries) omitted
 * @access  Public
 */
router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

/**
 * @route   GET /api/patients/:id
 * @desc    Get a single patient's complete profile including sensitive data and medical records
 * @access  Public
 */
router.get(
  "/:id",
  (
    req: express.Request<{ id: string }>,
    res: Response<Patient | { error: string }>,
  ) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
  },
);

/**
 * @route   POST /api/patients
 * @desc    Validate request body data layout with Zod and add a new patient to database seed
 * @access  Public
 */
router.post(
  "/",
  (
    req: express.Request<unknown, unknown, NewPatientEntry>,
    res: Response<Patient | { error: unknown }>,
  ) => {
    try {
      // Validate incoming request parameters using the structural Zod parser engine
      const newPatientEntry = toNewPatientEntry(req.body);

      // Force type assertion 'as NewPatient' to reconcile loosely inferred schema shapes with strict service requirements
      const addedEntry = patientService.addPatient(
        newPatientEntry as NewPatient,
      );

      res.json(addedEntry);
    } catch (error: unknown) {
      // Catch structural errors bubbling up directly from Zod schema validation constraints
      if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
      } else {
        res.status(400).send({ error: "Unknown error occurred" });
      }
    }
  },
);

export default router;
