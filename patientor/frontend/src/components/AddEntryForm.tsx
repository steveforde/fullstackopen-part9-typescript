import { useState, SyntheticEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { EntryFormValues } from "../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

export const AddEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [type, setType] = useState<"HealthCheck" | "Hospital">("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState("");

  // HealthCheck specific state
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  // Hospital specific state
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const diagnosisCodes = diagnosisCodesInput
      ? diagnosisCodesInput
          .split(",")
          .map((code) => code.trim())
          .filter(Boolean)
      : undefined;

    const baseValues = {
      description,
      date,
      specialist,
      ...(diagnosisCodes && { diagnosisCodes }),
    };

    if (type === "HealthCheck") {
      onSubmit({
        ...baseValues,
        type: "HealthCheck",
        healthCheckRating,
      } as EntryFormValues);
    } else {
      onSubmit({
        ...baseValues,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      } as EntryFormValues);
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 2,
        p: 2,
        mb: 3,
        bgcolor: "#fff",
      }}
    >
      {/* Fixed Header Name - Matches Screenshot 2026-06-16 at 12.29.55.png exactly */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        New HealthCheck Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={addEntry}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            labelId="entry-type-label"
            value={type}
            label="Entry Type"
            onChange={({ target }) =>
              setType(target.value as "HealthCheck" | "Hospital")
            }
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>

        {/* Date Field is FIRST - matching the instruction layout */}
        <TextField
          type="date"
          label="Date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ mb: 2 }}
          required
        />

        {/* Description Field is SECOND */}
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          label="Diagnosis Codes (comma-separated)"
          placeholder="e.g. L20, Z74.3"
          fullWidth
          value={diagnosisCodesInput}
          onChange={({ target }) => setDiagnosisCodesInput(target.value)}
          sx={{ mb: 2 }}
        />

        {type === "HealthCheck" ? (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="health-check-rating-label">
              Health Check Rating (0-3)
            </InputLabel>
            <Select
              labelId="health-check-rating-label"
              value={healthCheckRating}
              label="Health Check Rating (0-3)"
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            >
              <MenuItem value={0}>0 (Healthy)</MenuItem>
              <MenuItem value={1}>1 (Low Risk)</MenuItem>
              <MenuItem value={2}>2 (High Risk)</MenuItem>
              <MenuItem value={3}>3 (Critical Risk)</MenuItem>
              <MenuItem value={5}>5 (Invalid Value Test)</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Box
            sx={{
              border: "1px solid #ddd",
              p: 2,
              borderRadius: 1,
              mb: 3,
              bgcolor: "#fafafa",
            }}
          >
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: "bold", color: "text.secondary" }}
            >
              Discharge Information
            </Typography>
            <TextField
              type="date"
              label="Discharge Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              required
            />
          </Box>
        )}

        {/* Action button layout positioned exactly like the screenshot */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button type="submit" variant="contained" color="primary">
            ADD
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={onCancel}
            sx={{ bgcolor: "#fff", color: "#1976d2", borderColor: "#ccc" }}
          >
            CANCEL
          </Button>
        </Box>
      </form>
    </Box>
  );
};
