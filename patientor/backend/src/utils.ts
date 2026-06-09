import { NewPatientEntry, Gender } from "./types.js";

// Helper to check if something is a string
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// Parser for generic strings (Name, SSN, Occupation)
const parseStringField = (label: string, field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing ${label}`);
  }
  return field;
};

// Helper to validate date format
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Parser for Date of Birth
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return date;
};

// Type predicate to validate if a string is one of our Gender const values
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v as string)
    .includes(param);
};

// Parser for Gender
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

// Main entry point for request body safe parsing
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringField("name", object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringField("ssn", object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringField("occupation", object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
