// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import { Grid, Container, TextField, MenuItem } from "@mui/material";
import CountryRhymesNavbar from '../components/CountryRhymesNavbar';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("region");
  const [filterValue, setFilterValue] = useState("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const languages = [
    "Spanish",
    "English",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi",
    "Urdu",
    "Bengali",
    "Turkish",
    "Persian",
    "Greek",
    "Polish",
    "Dutch",
    "Swahili",
    "Coptic"
  ];

  const fetchAllCountries = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(response.data);
  };

  const fetchCountriesByName = async (name) => {
    if (name.trim() === "") {
      fetchAllCountries();
      return;
    }
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      setCountries(response.data);
    } catch (err) {
      setCountries([]);
    }
  };

  const fetchCountriesByRegion = async (regionName) => {
    if (!regionName) {
      fetchAllCountries();
      return;
    }
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/region/${regionName}`);
      setCountries(response.data);
    } catch (err) {
      setCountries([]);
    }
  };

  const fetchCountriesByLanguage = async (language) => {
    if (!language) {
      fetchAllCountries();
      return;
    }
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/lang/${language}`);
      setCountries(response.data);
    } catch (err) {
      setCountries([]);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);

    if (value === "") {
      fetchAllCountries();
      return;
    }

    if (filterType === "region") {
      fetchCountriesByRegion(value);
    } else {
      fetchCountriesByLanguage(value);
    }
  };

  // Reset filterValue when filterType changes
  useEffect(() => {
    setFilterValue("");
  }, [filterType]);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return (
    <><CountryRhymesNavbar />
    <Container sx={{ mt: 4 }}>
      {/* Search by Name */}
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => fetchCountriesByName(e.target.value)}
      />

      {/* Filter Type Selector */}
      <TextField
        select
        label="Filter Type"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      >
        <MenuItem value="region">Region</MenuItem>
        <MenuItem value="language">Language</MenuItem>
      </TextField>

      {/* Dynamic Filter Dropdown */}
      <TextField
        select
        label={filterType === "region" ? "Select Region" : "Select Language"}
        value={filterValue}
        onChange={handleFilterChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All {filterType === "region" ? "Regions" : "Languages"}</MenuItem>
        {filterType === "region"
          ? regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))
          : languages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
      </TextField>

      {/* Country Cards */}
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.cca3} sx={{ display: "flex" }}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
};

export default Home;