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
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        entries
      </Typography>

      {/* Conditional Rendering: Check if the entry logs array contains records */}
      {patient.entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No entries recorded yet.
        </Typography>
      ) : (
        patient.entries.map((entry) => (
          <Box key={entry.id} sx={{ mb: 3 }}>
            {/* Entry Header Block containing date string */}
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {entry.date}
            </Typography>

            {/* Entry Description Block formatted in italics */}
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {entry.description}
            </Typography>

            {/* Conditional Sub-List Rendering: Loops through diagnosis tracking codes if array exists */}
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <Box component="ul" sx={{ mt: 1, pl: 3 }}>
                {entry.diagnosisCodes.map((code) => (
                  <Box component="li" key={code} sx={{ typography: "body2" }}>
                    {code}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default PatientDetailPage;
