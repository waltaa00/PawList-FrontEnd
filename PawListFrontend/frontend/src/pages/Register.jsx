import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Divider, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { register } from '../services/authService'; // Assuming the registration function is in the authService
import Swal from "sweetalert2"; // Import deleteDog from your service

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // For programmatic navigation

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await register({ username, password });

            if (response.success) {
                console.log('Registration successful:', response);
                localStorage.setItem('authToken', response.token);
                Swal.fire({
                    title: "Done!",
                    text: "You have been registered successfully",
                    icon: "sucecss",
                    background: "#2a2a2a",   // Dark background for the popup
                    color: "#fff",           // White text for contrast
                    confirmButtonColor: "#90caf9", // Accent color for the confirm button
                    customClass: {
                        popup: 'my-swal-popup' // Optional: use a custom CSS class for further styling
                    }
                });
                navigate('/login'); // Navigate to login after successful registration
            } else {
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
            console.log('An error occurred during registration:', error);
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

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: '#fff', fontWeight: 600 }}
                >
                    Sign up
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <FormControl>
                        <FormLabel
                            htmlFor="username"
                            sx={{ color: '#ccc', marginBottom: 1, textAlign: 'left' }}
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
                                    '& fieldset': { borderColor: '#555' },
                                    '&:hover fieldset': { borderColor: '#777' },
                                    '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                                },
                                '& .MuiInputLabel-root': { color: '#aaa' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#90caf9' }
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
                                    '& fieldset': { borderColor: '#555' },
                                    '&:hover fieldset': { borderColor: '#777' },
                                    '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                                },
                                '& .MuiInputLabel-root': { color: '#aaa' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#90caf9' }
                            }}
                        />
                    </FormControl>

                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}

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
                        Create Account
                    </Button>
                </Box>

                <Divider sx={{ my: 2, borderColor: '#3a3a3a', color: '#fff' }}>or</Divider>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#ccc' }}>
                        <Button
                            onClick={() => navigate('/login')}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                color: '#90caf9'
                            }}
                        >
                            Back to Log In
                        </Button>
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default RegisterPage;
