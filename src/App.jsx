import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import React, { useEffect, useState } from 'react';
import SearchResults from './Components/SearchResult';
import VideoPlayer from './Components/YouTube';
import LoginForm from './Components/Login';
import SignUpForm from './Components/Singup';
import { Navigate } from 'react-router-dom';
import ApiDetails from './Components/ApiDetails';
import Details from './Components/Details'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/yt" element={<VideoPlayer />} />
          <Route path="/ApiDetails/:id" element={<ApiDetails />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




      