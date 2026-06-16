import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";

/**
 * Fetch all patient records from the backend API
 * @returns {Promise<Patient[]>} An array of full patient objects
 */
const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

/**
 * Send a POST request to add a new patient to the server data store
 * @param {PatientFormValues} object - Form payload containing name, ssn, dob, occupation, gender
 * @returns {Promise<Patient>} The newly created patient object returned from the backend (including its generated ID)
 */
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

/**
 * Fetch the complete, sensitive profile details for a single target patient by ID
 * @param {string} id - The unique UUID string of the patient
 * @returns {Promise<Patient>} The full patient profile data object
 */
const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

/**
 * Step 7 Frontend API Trigger: Submit a fresh medical entry to a target patient record
 * @param {string} patientId - The target patient's unique UUID string
 * @param {EntryFormValues} object - The raw input form payload for the new entry
 * @returns {Promise<Entry>} The fully formed entry object returned from the backend data engine
 */
const createEntry = async (patientId: string, object: EntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object,
  );
  return data;
};

export default {
  getAll,
  create,
  getById,
  createEntry,
};
