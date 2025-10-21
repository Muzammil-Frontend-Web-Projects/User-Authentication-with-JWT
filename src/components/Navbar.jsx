import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛍️ E-Commerce
        </Link>
        
        <div className="nav-links">
          {user ? (
            <>
              <span className="welcome-text">Hello, {user.name}</span>
              <button onClick={logout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;