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

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

// Infer the type dynamically from our Zod schema!
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
