import patientData from "../data/patients.json" with { type: "json" };
import { Patient, NonSensitivePatient, NewPatient } from "../types.js";
import { v4 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patientData as Patient[];
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return (patientData as Patient[]).map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  );
};

const findById = (id: string): Patient | undefined => {
  return (patientData as Patient[]).find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    name: entry.name,
    occupation: entry.occupation,
    gender: entry.gender,
    ssn: entry.ssn || "",
    dateOfBirth: entry.dateOfBirth || "",
    entries: entry.entries || [],
  };

  (patientData as Patient[]).push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
};
