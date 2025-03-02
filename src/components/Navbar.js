import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="navbar">
      <h1>Intern Project</h1>
      {user ? (
        <div className="navbar-links">
          <p>Welcome, {user.name}</p>
          <a href="/home">Home</a>
          <a href="/courses">Courses</a>
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      ) : (
        <div className="navbar-links">
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;