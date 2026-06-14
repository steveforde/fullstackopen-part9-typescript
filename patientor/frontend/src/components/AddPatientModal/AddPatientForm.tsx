import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const matchedGender = Object.values(Gender).find(
        (g) => g.toString() === value,
      );
      if (matchedGender) {
        setGender(matchedGender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender,
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Social security number"
          fullWidth
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Occupation"
          fullWidth
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
          sx={{ mb: 2 }}
        />

        <InputLabel sx={{ marginTop: 1 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
          sx={{ mb: 3 }}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {/* Replaced Grid with Box flexbox layouts to bypass version-specific Grid compilation bugs */}
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
            fullWidth
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddPatientForm;
