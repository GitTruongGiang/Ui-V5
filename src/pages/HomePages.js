import { Alert, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import JobList from "../components/JobList";
import LoadingScreen from "../components/LoadingScreen";

function HomePages() {
  const [loading, setLoanding] = useState(false);
  const [error, setError] = useState("");
  const [jobS, setJobS] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoanding(true);
      try {
        const response = await apiService.get("/jobs");
        setJobS(response.data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoanding(false);
    };
    fetchData();
  }, []);
  return (
    <Container sx={{ mt: 3 }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <JobList jobS={jobS}></JobList>
          )}
        </>
      )}
    </Container>
  );
}

export default HomePages;
