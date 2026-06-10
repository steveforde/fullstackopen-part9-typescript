import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import { getAllDiaries } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries()
      .then((data) => {
        console.log("Data arrived successfully:", data);
        setDiaries(data);
      })
      .catch((err) => {
        alert("React failed to catch the data. Error: " + err.message);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Diary Entries</h1>

      {diaries.length === 0 ? (
        <p>Loading entries from backend...</p>
      ) : (
        <div>
          {diaries.map((diary) => (
            <div
              key={diary.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <h3>Date: {diary.date}</h3>
              <p>
                <strong>Weather:</strong> {diary.weather}
              </p>
              <p>
                <strong>Visibility:</strong> {diary.visibility}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
