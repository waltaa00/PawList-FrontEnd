import React, { useState } from 'react';
import { Button, Container, TextField, Box, Card, Typography, FormControl, FormLabel  } from '@mui/material';
import { addDog } from '../services/dogService.js'; // The function to call the API to add a dog
import {Link, useNavigate} from 'react-router-dom'; // For navigation after adding the dog
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Swal from 'sweetalert2'
import {Label} from "@mui/icons-material";
import { styled } from '@mui/material/styles';


const AddDogPage = () => {
    const [breed, setBreed] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [bredFor, setBredFor] = useState('');
    const [temperament, setTemperament] = useState('');
    const [lifespan, setLifespan] = useState('');
    const [countryOfOrigin, setCountryOfOrigin] = useState('');
    const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file
    const navigate = useNavigate(); // Used for navigation after success

    // Handle image file change
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            uploadImage(file)
                .then((imageUrl) => {
                    console.log('Uploaded image URL:', imageUrl);
                    // Use the imageUrl to set it in your state or use it wherever needed
                })
                .catch((error) => {
                    console.error('Image upload failed:', error);
                });
        }
    };

    // Upload image to Cloudinary
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'dogImgs'); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dgcrjewoy/image/upload', formData);
            console.log(response.data); // Log the response data
            return response.data.secure_url; // Return the URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image:', error);
            if (error.response) {
                console.error('Cloudinary error message:', error.response.data); // Log the response from Cloudinary
            }
            throw new Error('Image upload failed');
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    // Handle form submission to add a dog
    const handleAddDog = async (e) => {
        e.preventDefault();

        if (imageFile) {
            try {
                // Upload the image and get the URL
                const uploadedImageUrl = await uploadImage(imageFile);

                // Check if uploadedImageUrl is returned correctly
                console.log('Uploaded image URL:', uploadedImageUrl);

                const newDog = {
                    breed,
                    imageUrl: uploadedImageUrl,  // Use the uploaded URL directly
                    bredFor,
                    temperament,
                    lifespan,
                    countryOfOrigin
                };

                // Add dog via API service
                await addDog(newDog);

                // Optionally, show a confirmation message to the user
                Swal.fire({
                    title: "Done!",
                    text: "The Dog has been added",
                    icon: "sucecss",
                    background: "#2a2a2a",   // Dark background for the popup
                    color: "#fff",           // White text for contrast
                    confirmButtonColor: "#90caf9", // Accent color for the confirm button
                    customClass: {
                        popup: 'my-swal-popup' // Optional: use a custom CSS class for further styling
                    }
                });
            } catch (error) {
                console.error('Error adding dog:', error);
                alert('Failed to add dog');
            }
        } else {
            alert('Please upload an image');
        }
    };



    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                backgroundColor: '#1f1f1f', // Dark background for the page
                p: 2
            }}
        >
            <Card
                sx={{
                    p: 3,
                    width: '100%',
                    maxWidth: 600,
                    backgroundColor: '#2a2a2a', // Dark card background
                    borderRadius: 2,
                    boxShadow: 3
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
                        color: '#90caf9'
                    }}
                >
                    ← Back
                </Link>

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: '#fff', fontWeight: 600 }}
                >
                    Add a New Dog
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleAddDog}
                    noValidate
                    autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '40ch' }
                    }}
                >
                    <FormControl>
                        <TextField
                            id="breed"
                            label="Breed"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            required
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
                        <TextField
                            id="bredFor"
                            label="Bred For"
                            value={bredFor}
                            onChange={(e) => setBredFor(e.target.value)}
                            variant="outlined"
                            multiline
                            maxRows={5}
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
                        <TextField
                            id="temperament"
                            label="Temperament"
                            value={temperament}
                            onChange={(e) => setTemperament(e.target.value)}
                            variant="outlined"
                            multiline
                            maxRows={5}
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
                        <TextField
                            id="lifespan"
                            label="Life Span"
                            value={lifespan}
                            onChange={(e) => setLifespan(e.target.value)}
                            variant="outlined"
                            fullWidth
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
                        <TextField
                            id="countryOfOrigin"
                            label="Country of Origin"
                            value={countryOfOrigin}
                            onChange={(e) => setCountryOfOrigin(e.target.value)}
                            variant="outlined"
                            fullWidth
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

                    <Button
                        component="label"
                        variant="outlined"
                        sx={{
                            mt: 2,
                            ml: 2,
                            width: '40ch',
                            height: '7ch',
                            color: '#fff',
                            borderColor: '#555',
                            '&:hover': { borderColor: '#777' },
                            textTransform: 'none',
                            marginLeft: -0.5,
                            marginTop: 1,
                            marginBottom: 1
                        }}
                        startIcon={<CloudUploadIcon sx={{ color: '#fff' }} />}
                    >
                        Upload an Image for the Dog
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 2,
                                fontWeight: 600,
                                textTransform: 'none',
                                backgroundColor: '#90caf9',
                                color: '#000',
                                '&:hover': { backgroundColor: '#64b5f6' },
                                marginBottom: 2
                            }}
                        >
                            Add Dog
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default AddDogPage;
