import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnoses";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001; // Patientor runs on 3001!

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// Mount your new router here:
app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
