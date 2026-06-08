import patientsData from "../data/patients.json" with { type: "json" };
import type { Patient, NonSensitivePatient } from "../types.js"; // Needs .js

const patients: Patient[] = patientsData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

// Map over the array to drop the ssn field from our response object
const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries,
};
