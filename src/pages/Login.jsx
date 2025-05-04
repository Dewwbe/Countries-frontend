import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5555/api/users/login', { email, password });
        localStorage.setItem('token', response.data.token);        
      window.location.href = '/home'; // Redirect to dashboard
    } catch (err) {
        console.log(err);
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#FF5B00',
        backgroundImage: 'linear-gradient(180deg, #FF5B00, #FFA500)',
      }}
    >
      {/* Left Side Features */}
      <Box
        sx={{
          width: '50%',
          padding: '5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700} color="white">
          Explore Countries with CountryRhymes
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/197/197471.png"
            alt="Globe"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="body1" color="white">
            Discover detailed profiles of over 250+ countries
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/197/197471.png"
            alt="Globe"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="body1" color="white">
            Compare demographics, currencies, and languages
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/197/197471.png"
            alt="Globe"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="body1" color="white">
            Track favorite countries in your dashboard
          </Typography>
        </Box>
      </Box>

      {/* Right Side Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 5,
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={3}>
          Sign In
        </Typography>
        {error && (
          <Typography variant="body2" color="error" mb={2}>
            {error}
          </Typography>
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
        >
          Sign In
        </Button>
        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{' '}
          <Link href="/register" underline="hover" color="primary">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;