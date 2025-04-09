import React from 'react'
import '../Style/NavBar.css'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate();

  function display() {
    navigate('/');
    window.location.reload()
  }



  return (
    <div onClick={display} className='section-1'>
      <div className='logo'>
        <h1>TMDB</h1>
        <div className='refresh'>
        </div>


      </div>


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


