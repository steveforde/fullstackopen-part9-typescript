import { z } from "zod";

export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor", //  Fixed to a colon
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

// Define schema validation using Zod
export const NewEntrySchema = z.object({
  // z.nativeEnum works beautifully with "as const" objects
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  // Validates that the input is a valid ISO 8601 date string (YYYY-MM-DD)
  date: z.string().date(),
  comment: z.string().optional(),
});

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
