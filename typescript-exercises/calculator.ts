/**
 * Define a strict union type restricted to only three valid string operations.
 */
type Operation = "multiply" | "add" | "divide";

/**
 * Shape of the successfully parsed configuration object.
 */
interface CalculatorValues {
  value1: number;
  value2: number;
  op: Operation;
}

/**
 * Validates and extracts arguments from the command line process context.
 * Expected format: npm run calculate -- <number1> <number2> <operation>
 */
const parseArguments = (args: string[]): CalculatorValues => {
  // process.argv contains: [0] node path, [1] script path, [2] val1, [3] val2, [4] operation
  if (args.length < 5) {
    throw new Error("Not enough arguments. Expected: number number operation");
  }
  if (args.length > 5) {
    throw new Error("Too many arguments");
  }

  const value1 = Number(args[2]);
  const value2 = Number(args[3]);
  const op = args[4];

  // Ensure both input parameters evaluate to a valid mathematical number
  if (isNaN(value1) || isNaN(value2)) {
    throw new Error("Provided values were not numbers!");
  }

  // Type guard assertion validation to intercept invalid string operators runtime side
  if (op !== "multiply" && op !== "add" && op !== "divide") {
    throw new Error("Operation must be multiply, add, or divide!");
  }

  return {
    value1,
    value2,
    op: op as Operation, // Type assertion telling TypeScript the string matches our type signature
  };
};

/**
 * Core execution engine calculation method processing numerical operations.
 */
const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      // Explicit check to intercept division by zero scenarios
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      // Fallback block required by strict type matching checks
      throw new Error("Operation is not multiply, add or divide!");
  }
};

// Execution context wrapper to elegantly intercept and report formatting failures safely
try {
  const { value1, value2, op } = parseArguments(process.argv);
  const result = calculator(value1, value2, op);
  console.log(`Result: ${result}`);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  // Check if error matches standard JS instance hierarchy structure
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
