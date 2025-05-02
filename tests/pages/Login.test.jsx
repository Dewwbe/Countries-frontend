import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/pages/Login';
import axios from 'axios';

// Mock Axios
jest.mock('axios');

// Mock window.location for testing redirect
delete window.location;
window.location = { href: '' };

describe('Login Page', () => {
  beforeEach(() => {
    window.location.href = '';
    axios.post.mockClear();
  });

  test('renders Login form correctly', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
  });

  test('shows loading spinner when submitting', async () => {
    axios.post.mockImplementationOnce(() =>
      new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });

  test('redirects to /home on successful login', async () => {
    axios.post.mockResolvedValue({
      data: {
        token: 'fake-jwt-token',
      },
    });

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(localStorage.getItem('email')).toBe('test@example.com');
      expect(window.location.href).toBe('/home');
    });
  });

  test('shows error message on failed login', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Invalid email or password' } },
    });

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  test('navigates to register on sign up link click', () => {
    render(<Login />);
    
    fireEvent.click(screen.getByText(/sign up/i));
    
    expect(window.location.href).toBe('/register');
  });
});