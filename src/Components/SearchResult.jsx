
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/SearchResult.css';
import { useParams, Link } from 'react-router-dom';
import noimg from '../assets/noimg.png';

let API_KEY = 'f33c43869bf34e435d406976805240f7';

function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('all');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    let endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;

    if (category !== 'all') {
      endpoint += `&type=${category}`;
    }

    axios
      .get(endpoint)
      .then((response) => setResults(response.data.results))
      .catch((error) => console.error(error));
  }, [query, category]);

  return (
    <div className="searchsection">
      <h1>Search Results for: {query}</h1>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((result) => (
            <Link to={`/ApiDetails/${result.id}`} key={result.id}>
              <div className="result-card">
                <img
                  width={'100px'}
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
                      : noimg
                  }
                  alt={result.name || result.title}
                  className="result-img"
                />
                <p>{result.name || result.title}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No results found for {query}</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;

