// src/components/CountryCard.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CountryCard = ({ country }) => {
  const commonName = country.name?.common || "Unknown";
  const population = country.population || 0;
  const region = country.region || "N/A";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  const flag = country.flags?.png || country.flags?.svg || "";
  const capital = country.capital?.[0] || "N/A";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={flag}
        alt={commonName}
        sx={{ height: 140, objectFit: "contain" }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="div"
            fontWeight="bold"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {commonName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Population:</strong>{" "}
            {new Intl.NumberFormat().format(population)}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Region:</strong> {region}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Languages:</strong> {languages}
          </Typography>
          <Typography variant="body2">
            <strong>Capital:</strong> {capital}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard;