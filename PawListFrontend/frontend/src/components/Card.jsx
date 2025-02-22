import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';  // For navigation to dog details

const DogCard = ({ id, breed, imageUrl, showButton = true, buttonText = 'View Details' }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                maxWidth: 345,
                marginBottom: '16px',
                backgroundColor: '#1f1f1f;', /* Dark gray */
                color: '#fff',              /* White text for contrast */
                cursor: 'pointer',
                transition: 'transform 0.3s ease', // Smooth transition for zoom
                '&:hover': {
                    transform: 'scale(1.05)', // Scale up by 5% on hover
                }
            }}
        >
            <CardMedia
                sx={{
                    height: 220,
                    objectFit: 'contain', // Ensures image fits within the card without cropping
                    objectPosition: 'center', // Centers the image
                }}
                image={imageUrl || 'https://via.placeholder.com/150'}
                crossOrigin="anonymous"
                title={breed}
            />
            <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div" fontFamily="Poppins" marginBottom={-2} textAlign={'left'}>
                    {breed}
                </Typography>
            </CardContent>
            <CardActions>
                {showButton && (
                    <Button sx={{color: '#90caf9'}}
                        size="medium"
                        onClick={() => navigate(`/dog-details/${id}`)}  // Navigate to dog details
                    >
                        VIEW DETAILS
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default DogCard;
