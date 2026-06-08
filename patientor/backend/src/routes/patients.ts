import express from "express";
import patientService from "../services/patientService.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

// Add the POST endpoint here in the patientor project
router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    const addedEntry = patientService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
