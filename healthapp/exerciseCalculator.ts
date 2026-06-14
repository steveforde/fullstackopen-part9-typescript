/// <reference types="node" />

// ==========================================
// 1. DATA STRUCTURE INTERFACE SIGNATURE
// ==========================================

/**
 * Shape layout tracking processed fitness metrics summary results
 */
export interface Result {
  periodLength: number; // Total number of logged days passed in the dataset
  trainingDays: number; // Number of days containing greater than 0 exercise hours
  success: boolean; // True if the average hours calculated meets or exceeds target values
  rating: number; // Metric score value scaling from 1 to 3 evaluating performance
  ratingDescription: string; // Readable descriptive evaluation text string matching the rating
  target: number; // The baseline target hours expected daily from the request profile
  average: number; // The calculated mathematical average of actual hours worked
}

// ==========================================
// 2. CORE EVALUATION CALCULATION FUNCTION
// ==========================================

/**
 * Processes raw exercise arrays against target milestones to evaluate score performance
 * @param {number[]} exerciseHours - Numeric array track containing hours completed per day
 * @param {number} target - Daily expected target runtime hour benchmark metric
 * @returns {Result} The computed tracking metrics summary object layout
 */
export const calculateExercises = (
  exerciseHours: number[],
  target: number,
): Result => {
  const periodLength = exerciseHours.length;
  // Isolate and count only structural array fields that contain logged working energy hours
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  // Tiered conditional bracket rules matching runtime calculations to custom strings
  if (average < target * 0.8) {
    rating = 1;
    ratingDescription = "you need to try much harder!";
  } else if (average >= target * 0.8 && average < target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "excellent work, target achieved!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// Interface rules layout capturing unpacked terminal command parameter arrays
interface ExerciseArguments {
  target: number;
  dailyExercises: number[];
}

/**
 * CLI Argument Slicer and Parser
 * Dissects raw array parameters, filtering and screening configurations safely.
 */
const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  // Enforce mandatory minimal parameter inputs count checks (node, script, target, exercises...)
  if (args.length < 4)
    throw new Error(
      "Not enough arguments. Provide a target and at least one day of exercise.",
    );

  const target = Number(args[2]);
  // Slice out trailing argument slots to cleanly isolate variable-length exercise arrays
  const dailyExercisesStrings = args.slice(3);
  const dailyExercises = dailyExercisesStrings.map((hours) => Number(hours));

  // Throw runtime type safety validation warnings if argument elements fail number translation rules
  if (isNaN(target)) {
    throw new Error("The target value must be a valid number!");
  }

  if (dailyExercises.some((hours) => isNaN(hours))) {
    throw new Error(
      "All provided daily exercise values must be valid numbers!",
    );
  }

  return {
    target,
    dailyExercises,
  };
};

// ==========================================
// 3. EXECUTION ENVIRONMENT ISOLATION GUARD
// ==========================================

/**
 * Boundary Guard Check
 * Confirms whether the file is directly invoked as the main script entry point in the terminal.
 * This blocks the interactive loop from launching automatically when Express imports the calculate function.
 */
if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyExercises } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
