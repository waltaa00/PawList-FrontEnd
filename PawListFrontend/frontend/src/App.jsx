import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import AddDogPage from './pages/AddDog';
import UpdateDogPage from './pages/UpdateDog';
import DeleteDogPage from './pages/DeleteDog';
import LoginPage from './pages/Login';
import SignupPage from './pages/Register';
import Navbar from './components/NavBar';
import DogDetails from './pages/DogDetail';
import { useAuth } from './context/AuthContext';
import Swal from 'sweetalert2';

const App = () => {
    // Use the auth context's state directly
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to log out?",
            icon: "warning",
            background: "#2a2a2a",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#90caf9",
            cancelButtonColor: "#f06292",
            confirmButtonText: "Yes, log out!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire({
                    title: "Logged Out",
                    text: "You have been logged out.",
                    icon: "success",
                    background: "#2a2a2a",
                    color: "#fff",
                    confirmButtonColor: "#90caf9"
                });
            }
        });
    };

    return (
        <Router>
            {isAuthenticated && <Navbar onLogout={handleLogout} />}
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <SignupPage /> : <Navigate to="/home" />}
                />
                <Route
                    path="/home"
                    element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route path="/dog-details/:id" element={<DogDetails />} />
                <Route
                    path="/add-dog"
                    element={isAuthenticated ? <AddDogPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/update-dog/:id"
                    element={isAuthenticated ? <UpdateDogPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/delete-dog/:id"
                    element={isAuthenticated ? <DeleteDogPage /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
