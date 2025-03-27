
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Api.css';
import { styled } from 'styled-components';
import YouTube from 'react-youtube';
import noimg from '../assets/noimg.png'; 

const Grade = styled.div`
    height: 370px;
    background-color: black;
    overflow-x:scroll;
`;

let url = "https://api.themoviedb.org/3/trending/all/day";

function Api() {
    let [data, setData] = useState([]);
    let [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    let [trail, setTrail] = useState([]);
    let [trailers, setTrailers] = useState({});

    const fetchTrendingData = () => {
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer YOUR_API_KEY`,
                }
            })
            .then((result) => {
                setData(result.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function popular() {
        axios
            .get('https://api.themoviedb.org/3/tv/popular', {
                headers: {
                    Authorization: `Bearer YOUR_API_KEY`,
                }
            })
            .then((result) => {
                setTrail(result.data.results);
                result.data.results.forEach((show) => {
                    fetchTrailerForTVShow(show.id);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchTrailerForTVShow = (showId) => {
        axios
            .get(`https://api.themoviedb.org/3/tv/${showId}/videos`, {
                headers: {
                    Authorization: `Bearer YOUR_API_KEY`
                }
            })
            .then((result) => {
                setTrailers((prevTrailers) => ({
                    ...prevTrailers,
                    [showId]: result.data.results
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        popular();
        fetchTrendingData();
    }, []);

    const handleSearch = () => {
        if (searchQuery) {
            navigate(`/search/${searchQuery}`);
        }
    };

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className='sec-1'>
            <h1>Welcome.<br />
                Millions of movies, TV shows, and people to discover. Explore now.

                <div className='box'>
                    <input 
                        type="text" 
                        placeholder='search for a movie,tv show,person....' 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <div className="search">
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </h1>

            <Grade>
                <div className='container-1'>
                    <h1>Trending</h1>
                </div>
                <div className='container-2'>
                    {
                        data.map((obj, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <Link to={`ApiDetails/${obj.id}`}>
                                            <div className='Card'>
                                                <img 
                                                    src={`https://image.tmdb.org/t/p/w500/` + obj.poster_path} 
                                                    alt={obj.title || obj.name} 
                                                    height={'100px'} 
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </Grade>

            <div className='product'>
                <h1>Latest Trailers</h1>

                <div className='productone'>
                    {
                        trail.map((obj, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                    
                                        {trailers[obj.id] && trailers[obj.id].length > 0 ? (
                                           
                                            <YouTube
                                                videoId={trailers[obj.id][0].key}
                                                opts={opts}
                                            />
                                        ) : (
                                          
                                            <img 
                                                src={noimg} 
                                                alt="No trailer available" 
                                                width="300"
                                                height="160"
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Api;
