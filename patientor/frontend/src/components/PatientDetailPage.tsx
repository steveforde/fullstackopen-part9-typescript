import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";

interface Props {
  diagnoses: Diagnosis[];
}

/**
 * Detailed Profile Component
 * Fetches and displays deep record data for a specific patient alongside translated diagnoses descriptions.
 */
const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  // Temporary diagnostic log to check state hydration
  console.log("Current diagnoses array state:", diagnoses);

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

  /**
   * Helper Code Translator Lookup
   * Scans the global diagnoses prop collection to find and return a matching readable name string.
   */
  const getDiagnosisName = (code: string): string => {
    const match = diagnoses.find((d) => d.code === code);
    return match ? match.name : "";
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

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        entries
      </Typography>

      {patient.entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No entries recorded yet.
        </Typography>
      ) : (
        patient.entries.map((entry) => (
          <Box key={entry.id} sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {entry.date}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {entry.description}
            </Typography>

            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <Box component="ul" sx={{ mt: 1, pl: 3 }}>
                {entry.diagnosisCodes.map((code) => (
                  <Box component="li" key={code} sx={{ typography: "body2" }}>
                    <strong>{code}</strong> {getDiagnosisName(code)}
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
