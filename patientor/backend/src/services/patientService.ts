import patientsData from "../data/patients.json" with { type: "json" };
import { Patient, NonSensitivePatient, NewPatientEntry } from "../types.js";
import { v1 as uuid } from "uuid";

// Typecast the JSON data safely to access optional properties during layout updates
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

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [], // Initializes the missing field requirement for Step 1
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) return undefined;

  return {
    ...patient,
    entries: patient.entries || [], // Ensures structural compatibility with old JSON entries
  };
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
};
