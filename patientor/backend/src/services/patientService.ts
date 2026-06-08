import { v1 as uuid } from "uuid";
import patientsData from "../data/patients.json" with { type: "json" };
import type {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
} from "../types.js";

const patients: Patient[] = patientsData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// Add this function right here:
const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient, // Don't forget to export it here
};
