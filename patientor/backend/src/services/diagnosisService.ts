import diagnosesData from "../data/diagnoses.json" with { type: "json" };
/* CORRECT: Change '.ts' to '.js' or remove it entirely. 
  NodeNext looks up the underlying file correctly at runtime using the .js convention.
*/
import type { Diagnosis } from "../types.js";

// Type assert the raw JSON array to your explicit Diagnosis interface
const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

/**
 * Fetch all available diagnoses data records
 * @returns {Diagnosis[]} Comprehensive array of Diagnosis objects
 */
const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

/**
 * Placeholder method stub for future diagnostic item additions
 */
const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
