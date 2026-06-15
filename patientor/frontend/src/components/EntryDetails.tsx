import { Box, Card, CardContent, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Entry, Diagnosis } from "../types";
import { assertNever } from "../types";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

/**
 * Entry Details Sub-Routing Presentation Component
 * Uses a discriminated union switch pattern to isolate and correctly display
 * properties unique to Hospital, Occupational, or generic HealthCheck records.
 */
export const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  /**
   * Safe Code Dictionary Lookup
   * Scans loaded context diagnostics state to pair code keys with text labels.
   */
  const getDiagnosisName = (code: string): string => {
    const match = diagnoses.find((d) => d.code === code);
    return match ? match.name : "";
  };

  /**
   * Health Rating Visual Mapper
   * Transforms numerical health tracking states into matching standard warning indicator colors.
   */
  const getHeartColor = (rating: number) => {
    switch (rating) {
      case 0:
        return "green"; // Healthy
      case 1:
        return "orange"; // Low Risk
      case 2:
        return "yellow"; // High Risk
      case 3:
        return "red"; // Critical Risk
      default:
        return "gray";
    }
  };

  /**
   * Standard Shared Diagnosis List Renderer
   * Conditionally maps sub-nested diagnosis string sets if attached to the incoming record payload.
   */
  const renderDiagnosisCodes = () =>
    entry.diagnosisCodes &&
    entry.diagnosisCodes.length > 0 && (
      <Box component="ul" sx={{ mt: 1, pl: 2, typography: "body2" }}>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>
            <strong>{code}</strong> {getDiagnosisName(code)}
          </li>
        ))}
      </Box>
    );

  // Structural rendering branched strictly by discriminated union key parameters
  switch (entry.type) {
    case "Hospital":
      return (
        <Card variant="outlined" sx={{ mb: 2, borderWidth: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {entry.date}
              </Typography>
              <MedicalServicesIcon color="action" />
            </Box>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {entry.description}
            </Typography>
            {renderDiagnosisCodes()}
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Discharge:</strong> {entry.discharge.date} —{" "}
              <em>{entry.discharge.criteria}</em>
            </Typography>
            <Typography
              variant="caption"
              display="block"
              sx={{ mt: 1, color: "text.secondary" }}
            >
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" sx={{ mb: 2, borderWidth: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {entry.date}
              </Typography>
              <WorkIcon color="action" />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {entry.employerName}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {entry.description}
            </Typography>
            {renderDiagnosisCodes()}
            {entry.sickLeave && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to{" "}
                {entry.sickLeave.endDate}
              </Typography>
            )}
            <Typography
              variant="caption"
              display="block"
              sx={{ mt: 1, color: "text.secondary" }}
            >
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      );

    case "HealthCheck":
      return (
        <Card variant="outlined" sx={{ mb: 2, borderWidth: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {entry.date}
              </Typography>
              <FavoriteIcon
                sx={{ color: getHeartColor(entry.healthCheckRating) }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {entry.description}
            </Typography>
            {renderDiagnosisCodes()}
            <Typography
              variant="caption"
              display="block"
              sx={{ mt: 1, color: "text.secondary" }}
            >
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      );

    default:
      // Compile-time security baseline tracking unexpected payloads from backend
      return assertNever(entry);
  }
};
