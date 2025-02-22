import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Container, TextField, Box, Link as MuiLink, Card, Typography } from '@mui/material';
import { getDogById, updateDog } from '../services/dogService';
import Swal from 'sweetalert2';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { styled } from "@mui/material/styles";

const UpdateDogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dog, setDog] = useState({
        breed: '',
        imageUrl: '',
        bredFor: '',
        temperament: '',
        lifespan: '',
        countryOfOrigin: ''
    });

    // State to hold a newly uploaded file
    const [imageFile, setImageFile] = useState(null);

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

    const handleUpdateDog = async (e) => {
        e.preventDefault();
        try {
            // By default, use the dog's existing image URL
            let updatedImageUrl = dog.imageUrl;

            // If the dog is using the default image AND the user uploaded a new file, upload it
            if (imageFile) {
                updatedImageUrl = await uploadImage(imageFile);
            }

            // Create the updated dog object
            const updatedDog = {
                ...dog,
                imageUrl: updatedImageUrl,
            };

            await updateDog(id, updatedDog);
            Swal.fire({
                title: "Done!",
                text: "Dog updated successfully",
                icon: "success",
                background: "#2a2a2a",   // Dark background for the popup
                color: "#fff",           // White text for contrast
                confirmButtonColor: "#90caf9", // Accent color for the confirm button
                customClass: {
                    popup: 'my-swal-popup' // Optional: use a custom CSS class for further styling
                }
            });
            navigate(`/dog-details/${id}`);
        } catch (error) {
            console.error('Error updating dog:', error);
            Swal.fire({
                title: "Error",
                text: "Failed to update the dog",
                icon: "error"
            });
        }
    };

    // When a file is selected, store it in state
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    // Upload image to Cloudinary
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'dogImgs'); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dgcrjewoy/image/upload', formData);
            console.log(response.data);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            if (error.response) {
                console.error('Cloudinary error message:', error.response.data);
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

    return (
        <Container
            sx={{
                mt: 4,
                minHeight: '100vh',
                backgroundColor: '#1f1f1f',
                p: 2,
                fontFamily: 'Poppins',
                marginTop: '-1rem'
            }}
        >
            <MuiLink
                component={Link}
                to={`/dog-details/${dog.id}`}
                sx={{
                    mb: 2,
                    display: 'block',
                    mt: 3,
                    textAlign: 'left',
                    textDecoration: 'none',
                    color: '#90caf9'
                }}
            >
                ← Back
            </MuiLink>

            <Card
                sx={{
                    maxWidth: 600,
                    margin: '0 auto',
                    backgroundColor: '#2a2a2a',
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 3
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: '#fff', fontWeight: 600 }}
                >
                    Updating: {dog.breed}
                </Typography>

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleUpdateDog}
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '40ch' }
                    }}
                >
                    <TextField
                        label="Breed"
                        value={dog.breed}
                        onChange={(e) => setDog({ ...dog, breed: e.target.value })}
                        required
                        margin="normal"
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
                    <TextField
                        label="Bred For"
                        value={dog.bredFor}
                        onChange={(e) => setDog({ ...dog, bredFor: e.target.value })}
                        required
                        fullWidth
                        margin="normal"
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
                    <TextField
                        label="Temperament"
                        value={dog.temperament}
                        onChange={(e) => setDog({ ...dog, temperament: e.target.value })}
                        required
                        fullWidth
                        margin="normal"
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
                    <TextField
                        label="Life Span"
                        value={dog.lifespan}
                        onChange={(e) => setDog({ ...dog, lifespan: e.target.value })}
                        required
                        fullWidth
                        margin="normal"
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
                    <TextField
                        label="Country of Origin"
                        value={dog.countryOfOrigin}
                        onChange={(e) => setDog({ ...dog, countryOfOrigin: e.target.value })}
                        required
                        fullWidth
                        margin="normal"
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

                    <Button
                        component="label"
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon sx={{ color: '#fff' }} />}
                        sx={{
                            mt: 2,
                            ml: 2,
                            width: '50ch',
                            height: '7ch',
                            color: '#fff',
                            borderColor: '#555',
                            '&:hover': { borderColor: '#777' },
                            textTransform: 'none'
                        }}
                    >
                        Update the image (optional)
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            id="btnAccept"
                            type="submit"
                            sx={{
                                mt: 2,
                                border: 'none',
                                color: '#fff',
                                backgroundImage: 'linear-gradient(30deg, #90caf9, #90caf9)',
                                borderRadius: '20px',
                                backgroundSize: '100% auto',
                                fontFamily: 'inherit',
                                fontSize: '17px',
                                padding: '0.6em 1.5em',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundPosition: 'right center',
                                    backgroundSize: '200% auto',
                                    animation: 'pulse512 1.5s infinite'
                                }
                            }}
                        >
                            Update Dog
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
};

export default UpdateDogPage;
