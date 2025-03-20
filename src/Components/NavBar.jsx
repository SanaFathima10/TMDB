import React from 'react'
import '../Style/NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {

  function display() {
    window.location.reload()
  }
  //   const handleLogout = () => {
  //     localStorage.removeItem('isLoggedIn');
  //     navigate('/login');
  // };


  return (
    <div onClick={display} className='section-1'>
      <div className='logo'>
        <h1>TMDB</h1>
        <div className='refresh'>
        </div>


      </div>
      {/* 
      <div className='navbar-links'>
        <ul>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>People</li>
          <li>More</li>
        </ul>
      </div> */}

      <div className='lgnsgn'>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar