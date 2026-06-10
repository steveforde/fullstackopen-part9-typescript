import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import axios from "axios"; // Import axios to narrow the error type

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  // Controlled form input states
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  // New state to hold the backend error message
  const [errorMessage, setErrorMessage] = useState("");

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

      // Reset form fields on success
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setErrorMessage(""); // Clear out any previous errors
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;

        // Check if backend returned the Zod error object structure
        if (data && typeof data === "object" && "error" in data) {
          try {
            // Parse the internal stringified JSON array from Zod
            const zodErrors = JSON.parse(data.error as string);
            if (Array.isArray(zodErrors) && zodErrors.length > 0) {
              const firstIssue = zodErrors[0];
              const fieldName = firstIssue.path[0]; // 'visibility' or 'weather'

              // Map the failing field to the exact text currently typed into the input state
              let invalidValue = "";
              if (fieldName === "visibility") invalidValue = visibility;
              if (fieldName === "weather") invalidValue = weather;

              // Generates the required format string: "Incorrect visibility: best ever"
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
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Add new entry</h2>

      {/* Display the error message in red if it exists */}
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Error: {errorMessage}
        </p>
      )}

      <form onSubmit={diaryCreation} style={{ marginBottom: "20px" }}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          visibility:{" "}
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          />
        </div>
        <div>
          weather:{" "}
          <input
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
        </div>
        <div>
          comment:{" "}
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id} style={{ marginBottom: "10px" }}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
