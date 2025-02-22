import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDogById, deleteDog } from '../services/dogService';
import { CircularProgress, Container,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box, Accordion,
    AccordionSummary,
    AccordionDetails } from '@mui/material';
import Swal from "sweetalert2";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DogDetailPage = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDogDetails = async () => {
            try {
                const data = await getDogById(id);
                setDog(data);
            } catch (error) {
                console.error('Error fetching dog details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDogDetails();
    }, [id]);

    const handleDeleteDog = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#90caf9",
            cancelButtonColor: "#d33",
            background: "#2a2a2a",   // Dark background for the popup
            color: "#fff",           // White text for contrast
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDog(id);
                    Swal.fire({
                        title: "Done!",
                        text: "The Dog has been deleted",
                        icon: "sucecss",
                        background: "#2a2a2a",   // Dark background for the popup
                        color: "#fff",           // White text for contrast
                        confirmButtonColor: "#90caf9", // Accent color for the confirm button
                        customClass: {
                            popup: 'my-swal-popup' // Optional: use a custom CSS class for further styling
                        }
                    });
                    navigate('/home');
                } catch (error) {
                    console.error('Error deleting dog:', error);
                    Swal.fire({
                        title: "Error",
                        text: "Failed to delete the dog",
                        icon: "error",
                        background: "#2a2a2a",   // Dark background for the popup
                        color: "#fff",           // White text for contrast
                        confirmButtonColor: "#90caf9", // Accent color for the confirm button
                        customClass: {
                            popup: 'my-swal-popup' // Optional: use a custom CSS class for further styling
                        }
                    });

                }
            }
        });
    };

    if (loading) {
        return (
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh'
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    if (!dog) return <p>Dog not found.</p>;

    return (
        <Container
            sx={{
                mt: 4,
                minHeight: '100vh',
                backgroundColor: '#1f1f1f',
                p: 2,
                marginTop: '-0.3rem'
            }}
        >
            <Link
                to="/home"
                style={{
                    marginBottom: '10px',
                    display: 'block',
                    fontFamily: 'Poppins',
                    textAlign: 'left',
                    textDecoration: 'none',
                    color: '#fff'
                }}
            >
                ← Back
            </Link>

            <Card
                sx={{
                    maxWidth: 600,
                    margin: '0 auto',
                    backgroundColor: '#2a2a2a',
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: 'hidden'
                }}
            >
                {/* Dog Image */}
                <CardMedia
                    component="img"
                    alt={dog.breed}
                    image={dog.imageUrl}
                    sx={{
                        width: '100%',
                        maxHeight: 350,
                        objectFit: 'contain',
                        objectPosition: 'center',
                        backgroundColor: '#2a2a2a'
                    }}
                />

                {/* Dog Information */}
                <CardContent sx={{ textAlign: 'left', fontFamily: 'Poppins', color: '#fff' }}>
                    <Typography variant="h4" gutterBottom>
                        {dog.breed}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body1">
                            <strong>Bred For:</strong> {dog.bredFor}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Temperament:</strong> {dog.temperament}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Life Span:</strong> {dog.lifespan}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Country of Origin:</strong> {dog.countryOfOrigin}
                        </Typography>
                    </Box>
                </CardContent>

                <Accordion
                    sx={{
                        backgroundColor: '#2a2a2a',
                        boxShadow: 'none',
                        color: '#fff'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                    >
                        <Typography variant="subtitle1">Options</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                {/* Action Buttons */}
                <CardActions sx={{ justifyContent: 'flex-start', pb: 2, ml: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/update-dog/${dog.id}`)}
                        startIcon={<EditIcon sx={{ color: '#000' }} />}
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            backgroundColor: '#90caf9',
                            color: '#000',
                            '&:hover': { backgroundColor: '#64b5f6' },
                            mr: 2
                        }}
                    >
                        Update Dog
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDeleteDog}
                        startIcon={<DeleteIcon sx={{ color: '#000' }} />}
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            backgroundColor: '#f48fb1',
                            color: '#000',
                            '&:hover': { backgroundColor: '#f06292' }
                        }}
                    >
                        Delete Dog
                    </Button>
                </CardActions>
                    </AccordionDetails>
                </Accordion>        
            </Card>
        </Container>

    );
};

export default DogDetailPage;
