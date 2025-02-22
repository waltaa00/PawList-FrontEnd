import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addDog } from '../services/dogService'; // updateDog and deleteDog would follow the same structure

const AddDogForm = () => {
    const [dogData, setDogData] = useState({
        breed: '',
        imageUrl: '',
        bredFor: '',
        temperament: '',
        lifespan: '',
        countryOfOrigin: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDogData({ ...dogData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDog(dogData);
        // Redirect or show success message
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField label="Breed" name="breed" value={dogData.breed} onChange={handleInputChange} required />
                <TextField label="Image URL" name="imageUrl" value={dogData.imageUrl} onChange={handleInputChange} required />
                <TextField label="Bred For" name="bredFor" value={dogData.bredFor} onChange={handleInputChange} />
                <TextField label="Temperament" name="temperament" value={dogData.temperament} onChange={handleInputChange} />
                <TextField label="Lifespan" name="lifespan" value={dogData.lifespan} onChange={handleInputChange} />
                <TextField label="Country of Origin" name="countryOfOrigin" value={dogData.countryOfOrigin} onChange={handleInputChange} />
                <Button type="submit" variant="contained">Add Dog</Button>
            </Box>
        </form>
    );
};

export default AddDogForm;
