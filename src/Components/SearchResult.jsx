import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/SearchResult.css'
import { useParams } from 'react-router-dom';

let API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzNjNDM4NjliZjM0ZTQzNWQ0MDY5NzY4MDUyNDBmNyIsIm5iZiI6MTcyOTc2MzUwOC4wNSwic3ViIjoiNjcxYTE4YjQ0YmUxNTQ2OWU3MGQ4MzcwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fXDghQTS8vSeiuSxWdKyjKENpO3By3SZPH1Q5EBdms0'

function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {

    axios
      .get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          query: query,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  return (
    <div className='searchsection'>
      <h1>Search Results for: {query}</h1>
      <div>
        {results.length > 0 ? (

          results.map((result) => (
            <div key={result.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                alt={result.name || result.title}
              />
              {/* <h3>{result.name || result.title}</h3> */}
            </div>

          ))
        ) : (
          <p>No results found for  {query}</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
