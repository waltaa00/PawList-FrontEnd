import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import pawListImage from '../assets/pawlist3.svg'; // Logo

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)',
                boxShadow: 'none',
                paddingX: 2,
                marginTop: -2
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left Section: Logo + Brand Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                        src={pawListImage}
                        alt="Paw List Logo"
                        style={{ maxWidth: '60px', objectFit: 'contain', maxHeight: '60px' }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            letterSpacing: 1,
                            color: '#fff',
                        }}
                    >
                        PawList
                    </Typography>
                </Box>

                {/* Right Section: Nav Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        onClick={() => navigate('/home')}
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(144, 202, 249, 0.08)', // Subtle hover effect
                            },
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        onClick={() => navigate('/add-dog')}
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(144, 202, 249, 0.08)',
                            },
                        }}
                    >
                        Add Dog
                    </Button>
                    <Button
                        onClick={onLogout}
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(144, 202, 249, 0.08)',
                            },
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
