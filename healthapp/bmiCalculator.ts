/// <reference types="node" />

/**
 * Core BMI Mathematical Computation Engine
 * Accepts height in centimeters and weight in kilograms to evaluate standard health brackets.
 * @param {number} heightCm - Height value measured in centimeters
 * @param {number} weightKg - Weight value measured in kilograms
 * @returns {string} Text narrative describing the calculated BMI category outcome
 */
export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightMeters = heightCm / 100;
  // Calculate BMI formula metric value: kg / m^2
  const bmi = weightKg / (heightMeters * heightMeters);

  // Evaluate the quantitative metric score against standard descriptive category bounds
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return "Normal range";
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30.0 && bmi < 35.0) {
    return "Obese (Class I)";
  } else if (bmi >= 35.0 && bmi < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

// Interface signature enforcing structure rules on parsed CLI inputs
interface BmiArguments {
  height: number;
  weight: number;
}

/**
 * Terminal Command Line Interface Argument Parser
 * Extracts and screens raw string arrays passed into Node execution loops.
 */
const parseBmiArguments = (args: string[]): BmiArguments => {
  // Ensure the runtime parameters arrays contain exactly the height and weight arguments required
  if (args.length < 4)
    throw new Error(
      "Not enough arguments. Provide height (cm) and weight (kg).",
    );
  if (args.length > 4) throw new Error("Too many arguments.");

  // Assert runtime type correctness by confirming both parameters translate securely to numbers
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

/**
 * Execution Environment Boundary Guard
 * Confirms whether the file is being directly run as a main executable script or imported.
 * This blocks the interactive CLI block from executing when Express runs web server integrations.
 */
if (process.argv[1] === import.meta.filename) {
  try {
    // Unpack, convert, and forward raw process argument data matrices
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
