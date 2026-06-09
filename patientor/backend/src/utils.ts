import { z } from "zod";
import { Gender } from "./types.js";

// Define the schema for a new patient entry
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(), // Validates YYYY-MM-DD strings automatically
  ssn: z.string(),
  gender: z.nativeEnum(Gender), // Validates against our Gender enum values
  occupation: z.string(),
});

// Helper function to parse and validate the request body
export const toNewPatientEntry = (object: unknown) => {
  return NewPatientSchema.parse(object);
};
