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
} from "@mui/material";
import { EntryFormValues } from "../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

export const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
    } as EntryFormValues);
  };

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 2,
        p: 2,
        mb: 3,
        bgcolor: "#fafafa",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        New HealthCheck Entry
      </Typography>

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mb: 2 }}
          required
        />
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
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ mb: 2 }}
          required
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="health-check-rating-label">
            Health Check Rating
          </InputLabel>
          <Select
            labelId="health-check-rating-label"
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          >
            <MenuItem value={0}>0 (Healthy)</MenuItem>
            <MenuItem value={1}>1 (Low Risk)</MenuItem>
            <MenuItem value={2}>2 (High Risk)</MenuItem>
            <MenuItem value={3}>3 (Critical Risk)</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="error"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};
