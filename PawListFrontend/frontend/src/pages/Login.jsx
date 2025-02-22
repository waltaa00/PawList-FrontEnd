import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { Box, Button, Card, Divider, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Use the auth context
import { login } from '../services/authService'; // Using the login function from the authService
import pawListImage from '../assets/Paw2.svg'; // Image import
import Swal from "sweetalert2"; // Import deleteDog from your service

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // For programmatic navigation
    const { login: authLogin } = useAuth(); // Use the login method from context

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await login({ username, password }); // Use the login function from the service

            if (response.success) {
                console.log('Login successful:', response);
                // Store the token in localStorage
                localStorage.setItem('authToken', response.token);
                // Update authentication status
                authLogin(response.token); // Use auth context to mark user as authenticated
                // Redirect to the home page after successful login
                navigate('/home');
                //window.location.href = '/home';
                // window.location.reload();

            } else {
                console.log('Login failed:', response.message);
                Swal.fire({
                    title: "Oops...",
                    text: "Please check your information!",
                    icon: "error",
                    background: "#2a2a2a",   // Dark background for the popup
                    color: "#fff",           // White text for contrast
                    confirmButtonColor: "#90caf9", // Accent color for the confirm button
                    customClass: {
                        popup: 'my-swal-popup' // Optional: use a custom CSS class for further styling
                    }
                });
            }
        } catch (error) {
            console.log('An error occurred during login:', error);
            Swal.fire({
                title: "Oops...",
                text: "Please check your information!",
                icon: "error",
                background: "#2a2a2a",   // Dark background for the popup
                color: "#fff",           // White text for contrast
                confirmButtonColor: "#90caf9", // Accent color for the confirm button
                customClass: {
                    popup: 'my-swal-popup' // Optional: use a custom CSS class for further styling
                }
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
                backgroundColor: '#1f1f1f' // Dark background for the page
            }}
        >
            <Card
                sx={{
                    p: 3,
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: '#2a2a2a', // Dark card background
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
                    
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <FormControl>
                        <FormLabel
                            htmlFor="username"
                            sx={{ color: '#ccc', marginBottom: 1, marginTop: -2, textAlign: 'left' }}
                        >
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
                                    '& fieldset': {
                                        borderColor: '#555'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#777'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#90caf9' // Accent color on focus
                                    }
                                }
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel
                            htmlFor="password"
                            sx={{ color: '#ccc', marginBottom: 1, textAlign: 'left' }}
                        >
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
                                    '& fieldset': {
                                        borderColor: '#555'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#777'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#90caf9'
                                    }
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
                            marginTop: 2,
                            textTransform: 'none',
                            backgroundColor: '#90caf9', // Accent button color
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#64b5f6'
                            }
                        }}
                    >
                        Log In
                    </Button>
                </Box>

                <Divider
                    sx={{
                        margin: '16px 0',
                        borderColor: '#3a3a3a',
                        color: '#fff'
                    }}
                >
                    or
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#ccc' }}>
                        Don't have an account?{' '}
                        <Button
                            onClick={() => navigate('/register')}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                color: '#90caf9'
                            }}
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
