type Operation = "multiply" | "add" | "divide";

interface CalculatorValues {
  value1: number;
  value2: number;
  op: Operation;
}

const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length < 5)
    throw new Error("Not enough arguments. Expected: number number operation");
  if (args.length > 5) throw new Error("Too many arguments");

  const value1 = Number(args[2]);
  const value2 = Number(args[3]);
  const op = args[4];

  // Validate that the inputs are real numbers
  if (isNaN(value1) || isNaN(value2)) {
    throw new Error("Provided values were not numbers!");
  }

  // Validate that the operation matches our specific union type strings
  if (op !== "multiply" && op !== "add" && op !== "divide") {
    throw new Error("Operation must be multiply, add, or divide!");
  }

  return {
    value1,
    value2,
    op: op as Operation, // Telling TypeScript it's safe to treat this string as our type
  };
};

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  const { value1, value2, op } = parseArguments(process.argv);
  const result = calculator(value1, value2, op);
  console.log(`Result: ${result}`);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
