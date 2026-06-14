import { z } from "zod";
import { Gender } from "./types.js";

/**
 * Zod Runtime Validation Schema
 * Declares the strict shape, types, and constraints required for creating a fresh patient record.
 */
export const NewPatientSchema = z.object({
  name: z.string(),
  // Built-in Zod validator ensuring the string adheres strictly to an ISO 8601 YYYY-MM-DD format
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  // Leverages nativeEnum to restrict valid incoming strings strictly to 'male' | 'female' | 'other'
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

/**
 * Parsing Helper Utility
 * Intercepts unverified payload structures from the express route context at runtime.
 * * @param {unknown} object - Raw request body object payload requiring structural processing
 * @returns {NewPatientEntry} Fully verified patient entity stripped of unrecognized properties
 * @throws {ZodError} If any structural rules or data type validations fail constraints
 */
export const toNewPatientEntry = (object: unknown) => {
  // .parse matches the layout rules, strips unlisted keys, and strips out hidden objects
  return NewPatientSchema.parse(object);
};
