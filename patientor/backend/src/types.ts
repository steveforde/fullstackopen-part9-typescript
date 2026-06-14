import { z } from "zod";
import { NewPatientSchema } from "./utils.js";

/**
 * Enumerated constants for valid, typed string gender values
 */
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

/**
 * Shape representing medical classification system diagnostic details
 */
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

/**
 * 1. Base Entry Interface
 * Shared structural backbone containing attributes required by every medical record type
 */
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>; // Array of references to existing Diagnosis code strings
}

/**
 * 2. HealthCheck Setup
 * Read-only constant object mapping evaluation names to numeric severity codes
 */
export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

// Extract union literal numbers (0 | 1 | 2 | 3) directly from the HealthCheckRating values
export type HealthCheckRatingType =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

/**
 * Variant interface for standard routine health tracking checkups
 */
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"; // Discriminating literal string type attribute
  healthCheckRating: HealthCheckRatingType;
}

/**
 * 3. Hospital Setup
 * Variant interface tracking inpatient admissions and discharge details
 */
interface HospitalEntry extends BaseEntry {
  type: "Hospital"; // Discriminating literal string type attribute
  discharge: {
    date: string;
    criteria: string;
  };
}

/**
 * 4. Occupational Setup
 * Variant interface handling job-site medical care and structured time off tracking
 */
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"; // Discriminating literal string type attribute
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

/**
 * 5. The Entry Union Type
 * Discriminated union type collecting all specific record layouts together
 */
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

/**
 * 6. Core Patient Interface
 * Complete structural layout tracking individual user identities and historical medical context
 */
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string; // Optional attribute to gracefully support data omission steps
  dateOfBirth?: string; // Optional attribute to safely manage missing records securely
  entries: Entry[]; // Poly-morphic array matching any variant within our Entry union type
}

/**
 * 7. Utility Types for Endpoints
 */

// Strips out the sensitive ssn field to fulfill general patient listing endpoints securely
export type NonSensitivePatient = Omit<Patient, "ssn">;

// Infers the static type layout directly out from your runtime parsing Zod validation schema
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

// Defines an unsaved patient state layout by completely dropping the unique database string 'id'
export type NewPatient = Omit<Patient, "id">;
