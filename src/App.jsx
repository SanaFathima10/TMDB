import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Api from './Components/Api'
import NavBar from './Components/NavBar'
import React from 'react';
import SearchResults from './Components/SearchResult'
import VideoPlayer from './Components/YouTube';
import LoginForm from './Components/Login';
import SignUpForm from './Components/Singup';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiDetails from './Components/ApiDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);


  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />

            <Route
              path="/"
              element={isLoggedIn ? <Api /> : <Navigate to="/login" />}
            />

            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/yt" element={<VideoPlayer />} />
            <Route path="/ApiDetails/:id" element={<ApiDetails />} />

          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
