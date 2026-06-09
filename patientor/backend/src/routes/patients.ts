import express, { Response } from "express";
import patientService from "../services/patientService.js";
import { toNewPatientEntry } from "../utils.js";
import { Patient, NewPatientEntry } from "../types.js";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post(
  "/",
  (
    req: express.Request<unknown, unknown, NewPatientEntry>,
    res: Response<Patient | { error: unknown }>,
  ) => {
    try {
      // Validate request body using our Zod parser helper
      const newPatientEntry = toNewPatientEntry(req.body);
      const addedEntry = patientService.addPatient(newPatientEntry);
      res.json(addedEntry);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // Send a 400 Bad Request detailing exactly which fields failed validation
        res.status(400).send({ error: error.issues });
      } else {
        res.status(400).send({ error: "Unknown error occurred" });
      }
    }
  },
);

export default router;
