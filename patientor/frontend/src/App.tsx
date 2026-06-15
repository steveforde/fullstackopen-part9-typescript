import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
// Crucial: Ensure this is imported cleanly as an object wrapper
import diagnosesService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage";

/**
 * Root Application Component
 * Manages global state grids for patients and diagnoses, configuring client-side routing.
 */
const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  /**
   * Initial Mount Lifecycle Effect
   * Fires baseline network accessibility checks and extracts remote lookups.
   */
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patientsData = await patientService.getAll();
      setPatients(patientsData);
    };

    const fetchDiagnosesList = async () => {
      // Calling our dedicated service which reaches out to port 3001
      const diagnosesData = await diagnosesService.getAll();
      setDiagnoses(diagnosesData);
    };

    void fetchPatientList();
    void fetchDiagnosesList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>

          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>

          <Divider sx={{ marginY: 2 }} />

          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientDetailPage diagnoses={diagnoses} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
