import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Sign in user
      const result = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      const userData = userDoc.data();
      
      // Save login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify({
        uid: result.user.uid,
        name: userData.name,
        email: userData.email,
      }));
      
      setSuccess(true);
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Successfully logged in! Redirecting...</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: '#3498db' }}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;