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
 * Placeholder interface representing historical medical event logs.
 * This structure will be expanded with variant configurations in future steps.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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
  healthCheckRating: number;
  entries: Entry[];
}

/**
 * Form Submission Payload Utility Shape
 * Creates a dedicated utility type by completely omitting backend-managed properties
 * ('id' and 'entries') from the core Patient interface. This shape precisely matches
 * the structure required by the form creation payload context.
 */
export type PatientFormValues = Omit<Patient, "id" | "entries">;
