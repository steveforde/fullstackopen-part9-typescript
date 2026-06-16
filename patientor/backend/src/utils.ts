import { z } from "zod";
import { Gender } from "./types.js";

// --- Patient Validation ---

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown) => {
  return NewPatientSchema.parse(object);
};

// --- Entry Validation (Step 7) ---

// Base criteria shared across all entry types
const BaseEntrySchema = z.object({
  description: z.string().min(1, "Description is required"),
  date: z.string().date("Invalid date format (YYYY-MM-DD)"),
  specialist: z.string().min(1, "Specialist name is required"),
  diagnosisCodes: z.array(z.string()).optional(),
});

// 1. HealthCheck Schema using the union trick from your course screenshot
const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ]),
});

// 2. Hospital Schema
const HospitalSchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date("Invalid discharge date format"),
    criteria: z.string().min(1, "Discharge criteria is required"),
  }),
});

// 3. OccupationalHealthcare Schema
const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, "Employer name is required"),
  sickLeave: z
    .object({
      startDate: z.string().date("Invalid sick leave start date"),
      endDate: z.string().date("Invalid sick leave end date"),
    })
    .optional(),
});

// Combined Union Schema matching the Step 7 backend endpoint specifications
export const NewEntrySchema = z.union([
  HealthCheckSchema,
  HospitalSchema,
  OccupationalHealthcareSchema,
]);

/**
 * Parsing Helper for New Entries
 * @param object - Raw req.body submission data from the API endpoint
 */
export const toNewEntry = (object: unknown) => {
  return NewEntrySchema.parse(object);
};
