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

export const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const getDiagnosisName = (code: string): string => {
    const match = diagnoses.find((d) => d.code === code);
    return match ? match.name : "";
  };

  const getHeartColor = (rating: number): string => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
        return "red";
      default:
        return "gray";
    }
  };

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

  switch (entry.type) {
    case "Hospital":
      return (
        <Card variant="outlined" sx={{ mb: 2, p: 1, borderRadius: 1 }}>
          <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {entry.date}
              </Typography>
              <MedicalServicesIcon />
            </Box>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {entry.description}
            </Typography>
            {renderDiagnosisCodes()}
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Discharge:</strong> {entry.discharge.date} —{" "}
              {entry.discharge.criteria}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" sx={{ mb: 2, p: 1, borderRadius: 1 }}>
          <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {entry.date}
              </Typography>
              <WorkIcon />
              <Typography
                variant="body1"
                sx={{ fontStyle: "italic", fontWeight: "bold" }}
              >
                {entry.employerName}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {entry.description}
            </Typography>
            {renderDiagnosisCodes()}
            {entry.sickLeave && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to{" "}
                {entry.sickLeave.endDate}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mt: 1 }}>
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      );

    case "HealthCheck":
      return (
        <Card variant="outlined" sx={{ mb: 2, p: 1, borderRadius: 1 }}>
          <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {entry.date}
              </Typography>
              <MedicalServicesIcon />
            </Box>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {entry.description}
            </Typography>

            {/* Heart rendering directly below description block */}
            <Box sx={{ mt: 1, mb: 1 }}>
              <FavoriteIcon
                sx={{ color: getHeartColor(entry.healthCheckRating) }}
              />
            </Box>

            {renderDiagnosisCodes()}
            <Typography variant="body2">
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      );

    default:
      return assertNever(entry);
  }
};
