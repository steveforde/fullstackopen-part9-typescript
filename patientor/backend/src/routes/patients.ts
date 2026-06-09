import express from "express";
import patientService from "../services/patientService.js";
import toNewPatientEntry from "../utils.js"; // Note the .js extension!

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    // Safely validate and parse the incoming data fields
    const newPatientEntry = toNewPatientEntry(req.body);

    // Pass the typed and verified data to our service
    const addedEntry = patientService.addPatient(newPatientEntry);

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
