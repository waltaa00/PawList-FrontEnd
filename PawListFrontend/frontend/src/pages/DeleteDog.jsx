import React, { useState, useEffect } from 'react';
import { Button, Container, CircularProgress } from '@mui/material'; // Using MUI components
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory in React Router v6
import { getDogById, deleteDog } from '../services/dogService.js'; // Ensure these are correct

const DeleteDogPage = () => {
    const [dog, setDog] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        const fetchDogDetails = async () => {
            try {
                const dogData = await getDogById(id); // Get dog details by ID
                setDog(dogData);
            } catch (error) {
                console.error('Error fetching dog details:', error);
            }
        };
        fetchDogDetails();
    }, [id]);

    const handleDeleteDog = async () => {
        try {
            await deleteDog(id); // Delete the dog by ID
            navigate('/home'); // Redirect to the home page after successful deletion
        } catch (error) {
            console.error('Error deleting dog:', error);
        }
    };

    if (!dog) {
        return (
            <Container>
                <CircularProgress /> {/* Show loading indicator while dog data is fetched */}
            </Container>
        );
    }

    return (
        <Container>
            <h2>Are you sure you want to delete this dog?</h2>
            <div>
                <h3>{dog.breed}</h3>
                <img src={dog.imageUrl} alt={dog.breed} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
            </div>
            <Button
                variant="contained"
                color="error"
                onClick={handleDeleteDog}
                style={{ marginTop: '20px' }}
            >
                Delete Dog
            </Button>
        </Container>
    );
};

export default DeleteDogPage;
