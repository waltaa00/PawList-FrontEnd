import React, { useState, useEffect } from 'react';
import { getDogs } from '../services/dogService';
import { Container, Grid, Typography } from '@mui/material';
import DogCard from '../components/Card';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

// A helper function to decode a JWT token without external libraries.
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
};

const HomePage = () => {
    const [dogs, setDogs] = useState([]);
    const [filteredDogs, setFilteredDogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = parseJwt(token);
            if (decoded) {
                setUsername(decoded.unique_name || '');
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dogData = await getDogs();
                setDogs(dogData);
                setFilteredDogs(dogData);
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        };
        fetchData();
    }, []);

    // Debounced search filtering
    const handleSearchChange = debounce((term) => {
        if (term) {
            const filtered = dogs.filter((dog) =>
                dog.breed.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredDogs(filtered);
        } else {
            setFilteredDogs(dogs);
        }
    }, 300);

    // NOTE: This function now expects a STRING, not an event
    const handleSearch = (value) => {
        setSearchTerm(value);
        handleSearchChange(value);
    };

    const handleLearnMoreClick = (id) => {
        navigate(`/dog-details/${id}`);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" sx={{ mt: 3, marginBottom: 2 }}>
                Hi {username && `${username}`}, Welcome to PawList!
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mt: -1, mb: 3 }}>
                Here you can search for Dog Breeds, add new Breeds, delete Breeds, and update them. Enjoy!
            </Typography>

            {/* 
        Pass searchTerm to the SearchBar as `searchQuery`
        and pass handleSearch as `setSearchQuery`.
      */}
            <SearchBar
                searchQuery={searchTerm}
                setSearchQuery={handleSearch}
            />

            <Grid container spacing={2}>
                {filteredDogs.length > 0 ? (
                    filteredDogs.map((dog) => (
                        <Grid item xs={12} sm={6} md={4} key={dog.id}>
                            <DogCard
                                id={dog.id}
                                breed={dog.breed}
                                imageUrl={dog.imageUrl}
                                showButton
                                onLearnMoreClick={() => handleLearnMoreClick(dog.id)}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" align="center">
                        No dogs found matching that breed.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default HomePage;
