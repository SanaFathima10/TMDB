

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

let API_KEY = 'f33c43869bf34e435d406976805240f7'; 

function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    console.log('Fetching details for ID:', id);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: { append_to_response: 'credits,images' },
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then((response) => {
        console.log('Movie Response:', response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
        axios
          .get(`https://api.themoviedb.org/3/tv/${id}`, {
            params: { append_to_response: 'credits,images' },
            headers: { Authorization: `Bearer ${API_KEY}` },
          })
          .then((response) => {
            console.log('TV Show Response:', response.data);
            setDetails(response.data);
          })
          .catch((error) => {
            console.error('Error fetching TV show details:', error);
          });
      });
  }, [id]);

  if (!details) return <p>Loading...</p>;

  return (
    <div className="details-section">
      <h1>{details.title || details.name}</h1>
      <img
        src={
          details.poster_path
            ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
            : '/path/to/default-image.jpg'
        }
        alt={details.title || details.name}
        className="details-img"
      />
      <p><strong>Release Date:</strong> {details.release_date || details.first_air_date}</p>
      <p><strong>Rating:</strong> {details.vote_average}</p>
      <p><strong>Overview:</strong> {details.overview}</p>
    </div>
  );
}

export default Details;
