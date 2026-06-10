import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  // Controlled form input states
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Allowed option arrays to cleanly map out our radio fields
  const visibilityOptions = ["great", "good", "ok", "poor"];
  const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const addedEntry = await createDiary({
        date,
        weather,
        visibility,
        comment,
      });
      setDiaries(diaries.concat(addedEntry));

      // Reset fields on successful addition
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setErrorMessage("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;

        if (data && typeof data === "object" && "error" in data) {
          try {
            const zodErrors = JSON.parse(data.error as string);
            if (Array.isArray(zodErrors) && zodErrors.length > 0) {
              const firstIssue = zodErrors[0];
              const fieldName = firstIssue.path[0];

              let invalidValue = "";
              if (fieldName === "visibility") invalidValue = visibility;
              if (fieldName === "weather") invalidValue = weather;

              setErrorMessage(`Incorrect ${fieldName}: ${invalidValue}`);
            } else {
              setErrorMessage("Validation failed on the backend.");
            }
          } catch {
            setErrorMessage(String(data.error));
          }
        } else if (typeof data === "string") {
          setErrorMessage(data);
        } else {
          setErrorMessage("Something went wrong with the submission.");
        }
      } else {
        console.error(error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    // Max-width keeps it compact, margin-left 0 aligns everything cleanly to the left side
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        textAlign: "left",
      }}
    >
      <h2>Add new entry</h2>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Error: {errorMessage}
        </p>
      )}

      <form onSubmit={diaryCreation} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <span style={{ marginRight: "10px" }}>date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Visibility Radio Buttons Row */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span>visibility:</span>
          {visibilityOptions.map((option) => (
            <label
              key={option}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              {option}
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
            </label>
          ))}
        </div>

        {/* Weather Radio Buttons Row */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span>weather:</span>
          {weatherOptions.map((option) => (
            <label
              key={option}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              {option}
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
            </label>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <span style={{ marginRight: "10px" }}>comment:</span>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <button
          type="submit"
          style={{ padding: "4px 12px", cursor: "pointer" }}
        >
          add
        </button>
      </form>

      <hr style={{ border: "0.5px solid #ccc", margin: "20px 0" }} />

      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id} style={{ marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 5px 0" }}>{diary.date}</h3>
          <p style={{ margin: "2px 0" }}>visibility: {diary.visibility}</p>
          <p style={{ margin: "2px 0" }}>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
