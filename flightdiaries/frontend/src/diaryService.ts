import axios from "axios";
import type { DiaryEntry } from "./types";

// CHANGE THIS FROM 3001 TO 3000:
const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};
