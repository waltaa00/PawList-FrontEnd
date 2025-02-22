import axiosInstance, { setAuthHeader } from "./authService";
import axios from 'axios';

// // Base URL for dog-related endpoints in the backend
// const API_URL_DOG = "http://localhost:5004/api/dogs";
// In your authService.js or similar:
const API_URL_DOG = import.meta.env.VITE_API_URL + "/dogs";


// Set the Authorization header
setAuthHeader();

/**
 * Retrieves all dog records from the backend.
 * @returns {Promise<Array>} - Array of dog objects.
 */
export const getDogs = async () => {
    try {
        const response = await axiosInstance.get(API_URL_DOG);
        return response.data;
    } catch (error) {
        console.error("Error fetching dogs:", error);
        throw error;
    }
};

/**
 * Retrieves a single dog by its ID.
 * @param {number} id - The ID of the dog.
 * @returns {Promise<Object>} - The dog object.
 */
export const getDogById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL_DOG}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching dog:", error);
        throw error;
    }
};

/**
 * Adds a new dog to the backend.
 * @param {Object} dog - The dog data.
 * @returns {Promise<Object>} - The backend response.
 */
export const addDog = async (dog) => {
    try {
        const response = await axios.post(`${API_URL_DOG}`, dog);
        if (response.status === 201) {
            console.log('Dog added successfully', response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error adding dog:", error);
        throw error;
    }
};


/**
 * Updates an existing dog.
 * @param {number} id - The ID of the dog to update.
 * @param {Object} dog - The updated dog data.
 * @returns {Promise<Object>} - The backend response.
 */
export const updateDog = async (id, dog) => {
    try {
        const response = await axiosInstance.put(`${API_URL_DOG}/${id}`, dog);
        return response.data;
    } catch (error) {
        console.error("Error updating dog:", error);
        throw error;
    }
};

/**
 * Deletes a dog by its ID.
 * @param {number} id - The ID of the dog to delete.
 * @returns {Promise<Object>} - The backend response.
 */
export const deleteDog = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_URL_DOG}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting dog:", error);
        throw error;
    }
};
