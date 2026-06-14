import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient } from "../types";
import patientService from "../services/patients";

/**
 * Detailed Profile Component
 * Fetches and displays deep record data for a specific patient based on URL path UUIDs.
 */
const PatientDetailPage = () => {
  // Extract the unique ID string parameter directly from the active react-router route hook
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  /**
   * Effect Hook
   * Fires an asynchronous API lookup fetch whenever the targeted route ID parameter mutates.
   */
  useEffect(() => {
    if (id) {
      patientService.getById(id).then((data) => setPatient(data));
    }
  }, [id]);

  // Conditional early return guarding rendering tree from accessing values on an unhydrated null state
  if (!patient) return <Typography>Loading patient details...</Typography>;

  /**
   * Helper Icon Resolver
   * Maps backend string values dynamically to standard accessible Material UI gender glyph indicators.
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
      {/* Patient Identity Header Row */}
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

      {/* Primary Demographic Metadata Stack */}
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

      {/* Historical Medical Incidents Section */}
      <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold" }}>
        Entries
      </Typography>

      {/* Entries tracking layout will expand here in upcoming steps */}
      <Typography variant="body2" color="text.secondary">
        No entries recorded yet.
      </Typography>
    </Box>
  );
};

export default PatientDetailPage;
