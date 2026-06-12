import { z } from "zod";
import { NewPatientSchema } from "./utils.js";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// Update this to omit BOTH 'ssn' and 'entries' as required
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

// Infer the type dynamically from our Zod schema!
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
