import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { Box, Button, Card, Divider, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Use the auth context
import { login } from '../services/authService'; // Login function from the authService
import pawListImage from '../assets/Paw2.svg'; // Image import
import Swal from "sweetalert2"; // For alerts

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login: authLogin, isAuthenticated } = useAuth(); // Assume your auth context now provides isAuthenticated

    // When authentication state changes, navigate to /home
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await login({ username, password }); // Use the login function from the service

            if (response.success) {
                console.log('Login successful:', response);
                // Store the token in localStorage
                localStorage.setItem('authToken', response.token);
                // Update authentication status in the auth context
                authLogin(response.token);
                // No need to call navigate here; the useEffect will handle redirection.
            } else {
                console.log('Login failed:', response.message);
                Swal.fire({
                    title: "Oops...",
                    text: "Please check your information!",
                    icon: "error",
                    background: "#2a2a2a",
                    color: "#fff",
                    confirmButtonColor: "#90caf9",
                });
            }
        } catch (error) {
            console.log('An error occurred during login:', error);
            Swal.fire({
                title: "Oops...",
                text: "Please check your information!",
                icon: "error",
                background: "#2a2a2a",
                color: "#fff",
                confirmButtonColor: "#90caf9",
            });
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#1f1f1f'
            }}
        >
            <Card
                sx={{
                    p: 3,
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: '#2a2a2a',
                    borderRadius: 2,
                    boxShadow: 3,
                    marginTop: -25
                }}
            >
                {/* Centered Image at the Top */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <img
                        src={pawListImage}
                        alt="Logo"
                        style={{ maxWidth: '100px', height: 'auto' }}
                    />
                </Box>

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: '#fff', fontWeight: 600 }}
                >
                    {/* Optional: Add a title if needed */}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <FormControl>
                        <FormLabel htmlFor="username" sx={{ color: '#ccc', mb: 1, mt: -2, textAlign: 'left' }}>
                            Username
                        </FormLabel>
                        <TextField
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    backgroundColor: '#3a3a3a',
                                    '& fieldset': { borderColor: '#555' },
                                    '&:hover fieldset': { borderColor: '#777' },
                                    '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                                }
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="password" sx={{ color: '#ccc', mb: 1, textAlign: 'left' }}>
                            Password
                        </FormLabel>
                        <TextField
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    backgroundColor: '#3a3a3a',
                                    '& fieldset': { borderColor: '#555' },
                                    '&:hover fieldset': { borderColor: '#777' },
                                    '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                                }
                            }}
                        />
                    </FormControl>

                    {errorMessage && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            fontWeight: 600,
                            mt: 2,
                            textTransform: 'none',
                            backgroundColor: '#90caf9',
                            color: '#000',
                            '&:hover': { backgroundColor: '#64b5f6' }
                        }}
                    >
                        Log In
                    </Button>
                </Box>

                <Divider sx={{ my: 2, borderColor: '#3a3a3a', color: '#fff' }}>
                    or
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#ccc' }}>
                        Don't have an account?{' '}
                        <Button
                            onClick={() => navigate('/register')}
                            sx={{ textTransform: 'none', fontWeight: 600, color: '#90caf9' }}
                        >
                            Register here
                        </Button>
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default LoginPage;
