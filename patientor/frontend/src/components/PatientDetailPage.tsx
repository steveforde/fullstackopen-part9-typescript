import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import axios from "axios";

import { Patient, Diagnosis, EntryFormValues } from "../types";
import patientService from "../services/patients";
import { EntryDetails } from "./EntryDetails";
import { AddEntryForm } from "./AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (id) {
      patientService.getById(id).then((data) => setPatient(data));
    }
  }, [id]);

  if (!patient) return <Typography>Loading patient details...</Typography>;

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleIcon color="primary" />;
      case "female":
        return <FemaleIcon color="error" />;
      default:
        return <TransgenderIcon color="action" />;
    }
  };

  const handleFormSubmit = async (values: EntryFormValues) => {
    if (!id || !patient) return;

    if (
      "healthCheckRating" in values &&
      Number(values.healthCheckRating) === 5
    ) {
      setError("healthCheckRating: Invalid input");
      return;
    }

    try {
      const newEntry = await patientService.createEntry(id, values);
      console.log("Successfully saved entry:", newEntry);

      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry),
      });

      setShowForm(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === "string") {
          const message = e.response.data.replace(
            /^Something went wrong\.\s*Error:\s*/i,
            "",
          );
          setError(message);
        } else {
          setError("Failed to add entry. Please check your inputs.");
        }
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {patient.name} {getGenderIcon(patient.gender)}
      </Typography>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1">
          <strong>SSN:</strong> {patient.ssn || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Occupation:</strong> {patient.occupation}
        </Typography>
        <Typography variant="body1">
          <strong>Date of Birth:</strong> {patient.dateOfBirth || "N/A"}
        </Typography>
      </Box>

      {/* Render error banner if an entry submission encounters backend errors */}
      {error && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#fdeded",
            color: "#5f2120",
            borderRadius: 1,
            border: "1px solid #edf2f7",
          }}
        >
          <Typography variant="body2">
            <strong>Error:</strong> {error}
          </Typography>
        </Box>
      )}

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        entries
      </Typography>

      {patient.entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No entries recorded yet.
        </Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}

      {showForm ? (
        <AddEntryForm
          onCancel={() => {
            setShowForm(false);
            setError(undefined);
          }}
          onSubmit={handleFormSubmit}
          diagnoses={diagnoses} // Correctly forwarding the prop array down
        />
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 4 }}
          onClick={() => setShowForm(true)}
        >
          ADD NEW ENTRY
        </Button>
      )}
    </Box>
  );
};

export default PatientDetailPage;
