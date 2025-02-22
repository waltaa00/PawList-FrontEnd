import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { getDogById } from '../services/dogService';  // Make sure you have this function
import { deleteDog } from '../services/dogService';

const DogDetailPage = () => {
    const { id } = useParams();  // Get the dog ID from the URL
    const navigate = useNavigate();  // For navigation
    const [dog, setDog] = useState(null);

    useEffect(() => {
        const fetchDogDetails = async () => {
            try {
                const dogData = await getDogById(id);
                setDog(dogData);
            } catch (error) {
                console.error('Error fetching dog details:', error);
            }
        };
        fetchDogDetails();
    }, [id]);

    const handleDeleteDog = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this dog?');
        if (confirmDelete) {
            try {
                await deleteDog(id);  // Ensure deleteDog is correctly imported
                alert('Dog deleted successfully');
                navigate('/home');  // Redirect to the home page
            } catch (error) {
                console.error('Error deleting dog:', error);
                alert('Failed to delete the dog');
            }
        }
    };


    if (!dog) return <p>Loading...</p>;  // Show loading state until the dog data is fetched

    return (
        <Container>
            <Typography variant="h4">{dog.breed}</Typography>
            <img src={dog.imageUrl} alt={dog.breed} style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h6">Bred For: {dog.bredFor}</Typography>
            <Typography variant="h6">Temperament: {dog.temperament}</Typography>
            <Typography variant="h6">Life Span: {dog.lifespan}</Typography>
            <Typography variant="h6">Country of Origin: {dog.countryOfOrigin}</Typography>

            <Button variant="contained" color="primary" onClick={() => navigate(`/update-dog/${id}`)}>
                Update Dog
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDeleteDog}>
                Delete Dog
            </Button>
        </Container>
    );
};

export default DogDetailPage;
