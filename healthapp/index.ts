import express from "express";
import { calculateExercises } from "./exerciseCalculator.ts";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // Disabling unsafe assignment warning for request body extraction
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // 1. Validation: Check if either parameters are missing completely
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({ error: "parameters missing" });
  }

  // 2. Validation: Ensure target can properly convert into a number
  const parsedTarget = Number(target);
  if (isNaN(parsedTarget)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // 3. Validation: Ensure daily_exercises is an array
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // 4. Validation: Check that every item inside the array is a valid number
  const validExercises: number[] = [];
  for (const day of daily_exercises) {
    const parsedDay = Number(day);
    if (isNaN(parsedDay)) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
    validExercises.push(parsedDay);
  }

  // 5. Calculations and execution
  const result = calculateExercises(validExercises, parsedTarget);
  return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
