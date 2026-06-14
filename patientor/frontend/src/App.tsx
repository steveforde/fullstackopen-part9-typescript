import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage";

/**
 * Root Application Component
 * Manages the global patient state grid hydration and configures Client-Side Routing (SPA).
 */
const App = () => {
  // Global React state engine holding the master array of brief patient profile entries
  const [patients, setPatients] = useState<Patient[]>([]);

  /**
   * Initial Mount Lifecycle Effect
   * Fires baseline network accessibility checks and extracts remote datasets.
   */
  useEffect(() => {
    // Fire-and-forget backend application connectivity check ('void' suppresses floating promise warnings)
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patientsData = await patientService.getAll();
      setPatients(patientsData);
    };

    void fetchPatientList();
  }, []); // Empty dependency array ensures execution fires strictly once on initial page compilation mount

  return (
    <div className="App">
      {/* BrowserRouter contextual wrapper supplying historical state capabilities down the virtual DOM tree */}
      <Router>
        <Container>
          {/* Main App branding header */}
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>

          {/* Material UI Button variant component re-cast directly into a React Router DOM declarative Link */}
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>

          <Divider sx={{ marginY: 2 }} />

          {/* Declarative switch framework swapping rendering panels matching current address bar window state */}
          <Routes>
            {/* Index Main Landing Dashboard Layout */}
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            {/* Deep Dynamic Patient Folder Viewport */}
            <Route path="/patients/:id" element={<PatientDetailPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
