import express, { type Request, type Response } from "express";
import diaryService from "../services/diaryService.ts";
import {
  type DiaryEntry,
  type NewDiaryEntry,
  type NonSensitiveDiaryEntry,
} from "../types.ts";
import { newDiaryParser, errorMiddleware } from "../middleware.ts";

const router = express.Router();

// This handles: GET http://localhost:3000/api/diaries
router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.send(data);
});

// This handles: GET http://localhost:3000/api/diaries/:id
router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

// This handles: POST http://localhost:3000/api/diaries
router.post(
  "/",
  newDiaryParser,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry>,
  ) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
