export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

// Omit the 'id' field for new creations
export type NewDiaryEntry = Omit<DiaryEntry, "id">;
