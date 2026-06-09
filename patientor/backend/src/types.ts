export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// 1. Create the read-only runtime object for validation
export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

// 2. Extract the union type ('male' | 'female' | 'other') from the object
export type Gender = (typeof Gender)[keyof typeof Gender];

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender; // <-- Updated from string to our strict Gender type
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;
