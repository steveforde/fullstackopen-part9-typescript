import axios from "axios";
import { Patient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

/**
 * Fetch all patient records from the backend API
 * @returns {Promise<Patient[]>} An array of full patient objects
 */
const getAll = async () => {
  // Uses Axios generics to ensure the response payload matches the Patient array type
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

export default {
  getAll,
  create,
  getById,
};
