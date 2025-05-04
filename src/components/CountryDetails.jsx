// pages/CountryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const CountryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!country) {
    return <Typography variant="h6">Country not found</Typography>;
  }

  const {
    flags,
    name: countryName,
    capital,
    region,
    population,
    languages,
  } = country;

  return (
    <Container sx={{ mt: 4 }}>
      <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
        Back
      </Button>
      <Card sx={{ maxWidth: 600, margin: "2rem auto" }}>
        <CardMedia component="img" height="300" image={flags?.png} alt={countryName?.common} />
        <CardContent>
          <Typography variant="h4">{countryName?.common}</Typography>
          <Typography variant="subtitle1">Official Name: {countryName?.official}</Typography>
          <Typography variant="body1">Capital: {capital?.[0]}</Typography>
          <Typography variant="body1">Region: {region}</Typography>
          <Typography variant="body1">Population: {population.toLocaleString()}</Typography>
          <Typography variant="body1">
            Languages: {languages ? Object.values(languages).join(", ") : "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CountryPage;
