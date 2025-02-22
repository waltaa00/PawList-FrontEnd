import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            label="Search for a Dog Breed"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // ^ We pass the *string* e.target.value 
            //   to the function in Home, which expects a string
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{
                mb: 3,
                // optional styling for a dark theme
                backgroundColor: '#2a2a2a',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                        borderColor: '#555',
                    },
                    '&:hover fieldset': {
                        borderColor: '#777',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#90caf9',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#aaa',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#90caf9',
                },
            }}
        />
    );
};

export default SearchBar;
