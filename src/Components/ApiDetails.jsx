import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../Style/FetchDetails.css';

function ApiDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchDetails = () => {
        const isMovie = id.includes('movie');
        const url = isMovie
            ? `https://api.themoviedb.org/3/movie/${id}`
            : `https://api.themoviedb.org/3/tv/${id}`;

        console.log('Fetching details from URL:', url);
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzNjNDM4NjliZjM0ZTQzNWQ0MDY5NzY4MDUyNDBmNyIsIm5iZiI6MTcyOTc2MzUwOC4wNSwic3ViIjoiNjcxYTE4YjQ0YmUxNTQ2OWU3MGQ4MzcwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fXDghQTS8vSeiuSxWdKyjKENpO3By3SZPH1Q5EBdms0`,
                },
            })
            .then((response) => {
                console.log('API Response:', response);
                setDetails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching details:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="api-details-container">
            {details && (
                <div className="details-content">
                    <h1>{details.title || details.name}</h1>
                    <img
                        src={details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : 'default-image-url.jpg'}
                        alt={details.title || details.name}
                        className="poster-img"
                    />
                    <p>{details.overview}</p>
                    <p>
                        <strong>Release Date:</strong>
                        {details.release_date || details.first_air_date}</p>
                    <p>   <strong>Rating:</strong>
                        {details.vote_average}
                    </p>
                    <button onClick={handleBackClick} className="back-button">Go Back</button>

                </div>
            )}
        </div>
    );
}

export default ApiDetails;
