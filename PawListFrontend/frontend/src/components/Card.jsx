
import React from "react";
import { Link } from "react-router-dom";

// Inline styles for the card
const cardStyle = {
    width: "200px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "10px",
    textDecoration: "none",
    color: "inherit",
};

const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
};

const contentStyle = {
    padding: "10px",
    textAlign: "center",
};

/**
 * DogCard component displays the dog's image and breed.
 * @param {Object} props - Contains the dog object.
 */
const Card = ({ dog }) => {
    return (
        <div style={{ padding: "10px", border: "1px solid #ddd", margin: "10px", borderRadius: "8px" }}>
            <img src={dog.imageUrl} alt={dog.name} style={{ width: "200px", height: "200px", borderRadius: "8px" }} />
            <h3>{dog.name}</h3>
            <p>{dog.breed}</p>
            <p>{dog.description}</p>
        </div>
    );
};

export default Card;
