// components/TextInput.jsx
import React from 'react';
import { TextField } from '@mui/material';

/**
 * Reusable text input component for form fields.
 * @param {Object} props - The properties passed to the component.
 */
const TextInput = ({ label, value, onChange, required }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            required={required}
            style={{ marginBottom: '15px' }}
        />
    );
};

export default TextInput;
