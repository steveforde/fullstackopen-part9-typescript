import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { LocalHospital, MedicalServices, Work } from "@mui/icons-material";
import { EntryFormValues, Diagnosis } from "../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

export const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");

  // Base fields
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);

  // HealthCheck specific fields
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  // Hospital specific fields
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare specific fields
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const handleDiagnosisChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>,
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseData = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    if (entryType === "HealthCheck") {
      onSubmit({
        ...baseData,
        type: "HealthCheck",
        healthCheckRating,
      } as EntryFormValues);
    } else if (entryType === "Hospital") {
      onSubmit({
        ...baseData,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      } as EntryFormValues);
    } else if (entryType === "OccupationalHealthcare") {
      const sickLeave =
        sickLeaveStartDate && sickLeaveEndDate
          ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
          : undefined;

      onSubmit({
        ...baseData,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave,
      } as EntryFormValues);
    }
  };

  const renderHeader = () => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <MedicalServices color="primary" />
            <Typography variant="h6">New HealthCheck Entry</Typography>
          </Box>
        );
      case "Hospital":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <LocalHospital color="error" />
            <Typography variant="h6">New Hospital Entry</Typography>
          </Box>
        );
      case "OccupationalHealthcare":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Work color="action" />
            <Typography variant="h6">
              New OccupationalHealthcare Entry
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        padding: 2,
        borderRadius: 2,
        marginBottom: 2,
      }}
    >
      {renderHeader()}

      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
          fullWidth
          value={entryType}
          onChange={({ target }) => setEntryType(target.value as any)}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>

        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 10 }}>Diagnosis codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={handleDiagnosisChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          style={{ marginBottom: 10 }}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} — {d.name}
            </MenuItem>
          ))}
        </Select>

        {/* Dynamic Extra Fields conditional blocks */}
        {entryType === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 15 }}>
              Health Check Rating
            </InputLabel>
            <Select
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            >
              <MenuItem value={0}>0 — Healthy</MenuItem>
              <MenuItem value={1}>1 — Low Risk</MenuItem>
              <MenuItem value={2}>2 — High Risk</MenuItem>
              <MenuItem value={3}>3 — Critical Risk</MenuItem>
              <MenuItem value={5}>5 (Invalid Value Test)</MenuItem>
            </Select>
          </>
        )}

        {entryType === "Hospital" && (
          <Box
            sx={{
              border: "1px solid #ddd",
              padding: 2,
              marginTop: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Discharge Details
            </Typography>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              margin="dense"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Box>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              margin="normal"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <Box
              sx={{
                border: "1px solid #ddd",
                padding: 2,
                marginTop: 2,
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2" color="textSecondary">
                Sick Leave (Optional)
              </Typography>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </Box>
          </>
        )}

        <Box
          display="flex"
          justifyContent="space-between"
          style={{ marginTop: 20 }}
        >
          <Button
            color="error"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};
