import express from "express";
import cors from "cors"; // 1. Import cors
import diagnosisRouter from "./routes/diagnoses.js";
import patientRouter from "./routes/patients.js";

const app = express();

app.use(cors()); // 2. Enable CORS for all origins
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
