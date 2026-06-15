export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

/**
 * Enumerated constants defining valid string values for patient genders
 */
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

/**
 * Core Medical Record Base Interface
 * Defines common properties shared across all variant clinical event configurations.
 */
export interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>; // Updated property name to match backend JSON
}

/**
 * Temporary Extended Entry Type
 * For Step 4, we extend the base properties to allow flexible presentation of medical events.
 */
export interface Entry extends BaseEntry {
  // Variant configurations (e.g., HealthCheck, OccupationalHealthcare, Hospital) will be added here in upcoming steps
}

/**
 * Core Patient Layout Shape
 * Structures full detailed datasets retrieved directly from individual patient file contexts.
 */
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]; // Typed array processing our newly updated Entry structural layout
}

/**
 * Form Submission Payload Utility Shape
 * Creates a dedicated utility type by completely omitting backend-managed properties
 * ('id' and 'entries') from the core Patient interface.
 */
export type PatientFormValues = Omit<Patient, "id" | "entries">;
