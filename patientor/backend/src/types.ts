export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // <-- Optional property because it might be missing
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// Use Omit utility type to create a type without the sensitive ssn field
export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;
