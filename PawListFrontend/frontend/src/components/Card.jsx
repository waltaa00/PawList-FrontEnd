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
                backgroundColor: '#1f1f1f', // Removed extra semicolon
                color: '#fff',              // White text for contrast
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                }
            }}
        >
            <CardMedia
                component="img" // Forces an <img> tag, which is ideal for image display
                sx={{
                    height: 220,
                    objectFit: 'contain', // Ensure the entire image is visible
                    objectPosition: 'center', // Centers the image
                }}
                image={imageUrl || 'https://via.placeholder.com/150'}
                crossOrigin="anonymous"
                title={breed}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    fontFamily="Poppins"
                    sx={{ mb: -2, textAlign: 'left' }}
                >
                    {breed}
                </Typography>
            </CardContent>
            <CardActions>
                {showButton && (
                    <Button
                        sx={{ color: '#90caf9' }}
                        size="medium"
                        onClick={() => navigate(`/dog-details/${id}`)}
                    >
                        {buttonText.toUpperCase()}
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default DogCard;
