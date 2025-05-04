import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CountryCard({ country }) {
  const navigate = useNavigate();
  const { name, flags, capital, region, population } = country;

  return (
    <Card onClick={() => navigate(`/country/${name.common}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={flags.png}
          alt={name.common}
        />
        <CardContent>
          <Typography variant="h6">{name.common}</Typography>
          <Typography>Capital: {capital?.[0]}</Typography>
          <Typography>Region: {region}</Typography>
          <Typography>Population: {population.toLocaleString()}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
