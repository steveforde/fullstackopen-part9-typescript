import express, { type Response } from "express";
import diaryService from "../services/diaryService";
import { NewEntrySchema } from "../types";
import type { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const router = express.Router();

// Get all non-sensitive diary entries
router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// Get a single entry by its numeric ID
router.get("/:id", (req, res: Response<DiaryEntry>) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

// Save a new validated diary entry
router.post("/", (req, res) => {
  try {
    const newDiaryEntry = NewEntrySchema.parse(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unexpected error occurred." });
    }
  }
});

export default router; // <-- Ensure this line is present and spelled correctly!
