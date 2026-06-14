import patientData from "../data/patients.json" with { type: "json" };
import { Patient, NonSensitivePatient, NewPatient } from "../types.js";
import { v4 as uuid } from "uuid";

/**
 * Fetch all patients in their raw form from the data store
 * @returns {Patient[]} Array of full patient objects
 */
const getEntries = (): Patient[] => {
  return patientData as Patient[];
};

/**
 * Fetch all patients with sensitive fields stripped out for the overview dashboard
 * @returns {NonSensitivePatient[]} Array of patients safely missing ssn strings
 */
const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return (patientData as Patient[]).map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries, // Entries array remains included but non-sensitive details like ssn are dropped
    }),
  );
};

/**
 * Look up a full patient profile matching a specific unique UUID string
 * @param {string} id - The unique identifier of the target patient
 * @returns {Patient | undefined} The matching Patient record, or undefined if not found
 */
const findById = (id: string): Patient | undefined => {
  return (patientData as Patient[]).find((p) => p.id === id);
};

/**
 * Generates a unique ID and appends a fresh, validated patient entry into the shared dataset
 * @param {NewPatient} entry - Unsaved patient properties extracted and verified from the request body
 * @returns {Patient} The newly compiled patient object complete with its assigned UUID string
 */
const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(), // Generate an explicit runtime RFC4122 UUID v4
    name: entry.name,
    occupation: entry.occupation,
    gender: entry.gender,
    ssn: entry.ssn || "", // Fallback default value to prevent undefined runtime breaks
    dateOfBirth: entry.dateOfBirth || "", // Fallback default value to ensure type consistency
    entries: entry.entries || [], // Initialize with an empty array if no historical data is provided
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
