import express from "express";
// Import your function using the .ts extension
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // Validation: Check if values are missing, are not numbers, or are invalid values
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

  const bmiStatus = calculateBmi(height, weight);

  // Return the strict JSON format expected by the assignment
  res.json({
    weight,
    height,
    bmi: bmiStatus,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
