import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnoses.js";
import patientRouter from "./routes/patients.js";

// Initialize the core Express application instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from your frontend development server (e.g., Vite on port 5173)
app.use(cors());

// Built-in Express middleware to automatically parse incoming request payloads with JSON content types
app.use(express.json());

// Define the port network interface binding configuration for local execution
const PORT = 3001;

/**
 * @route   GET /api/ping
 * @desc    Simple network availability health check endpoint
 * @access  Public
 */
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// Modular routing middleware mounts for domain-specific sub-routes
app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

// Bind and listen for connections on the specified network port hardware hook
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
