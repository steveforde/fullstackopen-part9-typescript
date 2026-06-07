import express from "express";
import diaryRouter from "./routes/diaries.ts"; // 1. Import your diaries router

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// 2. Mount the router to the /api/diaries base path
app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
