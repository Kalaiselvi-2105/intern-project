import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container">
      <h2>Available Courses</h2>
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          padding: '20px', 
          marginBottom: '15px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>Web Development Basics</h3>
          <p>Learn HTML, CSS, and JavaScript fundamentals</p>
        </div>
        <div style={{ 
          padding: '20px', 
          marginBottom: '15px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>React Framework</h3>
          <p>Master React.js for modern web applications</p>
        </div>
        <div style={{ 
          padding: '20px', 
          marginBottom: '15px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>Firebase Integration</h3>
          <p>Connect your apps to Firebase for authentication and database</p>
        </div>
      </div>
    </div>
  );
};

export default Courses;