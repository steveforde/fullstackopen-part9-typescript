import diaryEntries from "../../data/entries.json";
import type {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
} from "../types";

const diaries: DiaryEntry[] = diaryEntries as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

// Replace your old addDiary function with this:
const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addDiary,
};
