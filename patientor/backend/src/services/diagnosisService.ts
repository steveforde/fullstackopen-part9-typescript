import diagnosesData from "../data/diagnoses.json" with { type: "json" };
import type { Diagnosis } from "../types";

// Type assert the raw JSON array to your explicit Diagnosis interface
const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
