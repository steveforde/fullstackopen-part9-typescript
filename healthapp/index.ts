import express from "express";
import { calculateExercises } from "./exerciseCalculator.ts";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

// Middleware: Built-in Express JSON body parser to read incoming POST request data arrays
app.use(express.json());

/**
 * Route Endpoint: GET /hello
 * Standard introductory route used to confirm basic framework availability.
 */
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

/**
 * Route Endpoint: GET /bmi
 * Extracts URL search parameters via req.query to execute and return BMI categories.
 */
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // Validation Layer: Protect logic by rejecting missing parameters, non-numbers, or zero bounds
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(height) ||
    isNaN(weight) ||
    height <= 0 ||
    weight <= 0
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  // Pass sanitized inputs down to the shared calculation module
  const bmiStatus = calculateBmi(height, weight);

  // Return structural JSON properties exactly mirroring specification expectations
  res.json({
    weight,
    height,
    bmi: bmiStatus,
  });
});

/**
 * Route Endpoint: POST /exercises
 * Deconstructs body arguments payload arrays to calculate statistical tracking metrics summaries.
 */
app.post("/exercises", (req, res) => {
  // Disabling unsafe assignment warning explicitly since req.body properties are typed as an implicit 'any'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // 1. Structural Check: Reject payloads missing target parameters entirely
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({ error: "parameters missing" });
  }

  // 2. Type Check: Confirm the tracking milestone target parses correctly to a number
  const parsedTarget = Number(target);
  if (isNaN(parsedTarget)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // 3. Structural Check: Verify that the daily log dataset passed is a native array structure
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // 4. Type Check Loop: Step through array items individually to enforce true quantitative number formats
  const validExercises: number[] = [];
  for (const day of daily_exercises) {
    const parsedDay = Number(day);
    if (isNaN(parsedDay)) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
    validExercises.push(parsedDay);
  }

  // 5. Execution: Feed the clean validated parameter sets down to the exercise engine tracker
  const result = calculateExercises(validExercises, parsedTarget);
  return res.send(result);
});

const PORT = 3000;

// Initialize Server: Open up communication ports to capture incoming local network events
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
