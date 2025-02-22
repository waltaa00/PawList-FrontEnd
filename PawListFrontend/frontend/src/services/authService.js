import axios from "axios";

// Base URL for authentication endpoints in the backend
const API_URL_AUTH = "http://localhost:5004/api/auth";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: API_URL_AUTH,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Sends login credentials to the backend.
 * @param {Object} credentials - Contains username and password.
 * @returns {Promise<Object>} - The backend response, including the JWT token.
 */
export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post("/login", credentials);
        if (response.data.token) {
            // Store the token in localStorage
            localStorage.setItem("authToken", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

/**
 * Registers a new user with the backend.
 * @param {Object} credentials - Contains username and password.
 * @returns {Promise<Object>} - The backend response.
 */
export const register = async (credentials) => {
    try {
        const response = await axiosInstance.post("/register", credentials);
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
};

/**
 * Set the Authorization header for Axios requests.
 */
export const setAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers["Authorization"];
    }
};

export default axiosInstance;
