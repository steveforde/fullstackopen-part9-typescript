/// <reference types="node" />

// 1. Export the interface so index.ts can reference it if needed
export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// 2. Export the calculation function
export const calculateExercises = (
  exerciseHours: number[],
  target: number,
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

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

interface ExerciseArguments {
  target: number;
  dailyExercises: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4)
    throw new Error(
      "Not enough arguments. Provide a target and at least one day of exercise.",
    );

  const target = Number(args[2]);
  const dailyExercisesStrings = args.slice(3);
  const dailyExercises = dailyExercisesStrings.map((hours) => Number(hours));

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

// 3. Protect execution with a guard condition so it only runs if executed directly in terminal
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
