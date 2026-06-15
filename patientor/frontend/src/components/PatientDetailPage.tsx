import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import { EntryDetails } from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

/**
 * Detailed Profile Container Component
 * Handles side-effect API calls using targeted URL routing keys, organizing profile
 * statistics and delegating medical historical feeds to sub-interface component contexts.
 */
const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  /**
   * Local Lifecycle Hook
   * Fires unique backend query updates whenever component identity variables shift.
   */
  useEffect(() => {
    if (id) {
      patientService.getById(id).then((data) => setPatient(data));
    }
  }, [id]);

  // Loading safety fallback layout
  if (!patient) return <Typography>Loading patient details...</Typography>;

  /**
   * Gender Visual Icon Switcher
   * Returns styled UI iconography arrays to align visually with structural database values.
   */
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

  return (
    <Box sx={{ mt: 3 }}>
      {/* Patient Demographic Identity Block Header */}
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

      {/* Primary Biographical Attributes Layout */}
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

      {/* Historical Incident Header Registry Label */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        entries
      </Typography>

      {/* Entry Layout Mapping Layer */}
      {patient.entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No entries recorded yet.
        </Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </Box>
  );
};

export default PatientDetailPage;
