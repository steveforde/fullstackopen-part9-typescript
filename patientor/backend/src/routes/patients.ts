import express, { Response } from "express";
import patientService from "../services/patientService.js";
import { toNewPatientEntry } from "../utils.js";
import { Patient, NewPatientEntry, NewPatient } from "../types.js";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

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

router.post(
  "/",
  (
    req: express.Request<unknown, unknown, NewPatientEntry>,
    res: Response<Patient | { error: unknown }>,
  ) => {
    try {
      const newPatientEntry = toNewPatientEntry(req.body);
      const addedEntry = patientService.addPatient(
        newPatientEntry as NewPatient,
      );
      res.json(addedEntry);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
      } else {
        res.status(400).send({ error: "Unknown error occurred" });
      }
    }
  },
);

export default router;
