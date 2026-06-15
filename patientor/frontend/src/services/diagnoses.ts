import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

/**
 * Async API Client Service: GET All Diagnoses
 * Queries the backend service to retrieve the complete array collection of medical diagnosis codes.
 * @returns {Promise<Diagnosis[]>} Array data containing structural Diagnosis objects
 */
const getAll = async () => {
  const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

export default {
  getAll,
};
