import { z } from "zod";

// 1. Define runtime objects for Enums
export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

// 2. Extract types from runtime objects
export type Weather = (typeof Weather)[keyof typeof Weather];
export type Visibility = (typeof Visibility)[keyof typeof Visibility];

// 3. Define the Zod parsing schema
export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(), // Requires valid YYYY-MM-DD strings
  comment: z.string().optional(),
});

// 4. Infer types from schema and build structural interfaces
export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
