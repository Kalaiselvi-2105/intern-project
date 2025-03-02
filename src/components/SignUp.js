import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Update user profile with name
      await updateProfile(result.user, {
        displayName: formData.name
      });
      
      // Store additional user info in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date(),
      });
      
      // Save login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify({
        uid: result.user.uid,
        name: formData.name,
        email: formData.email,
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
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Successfully signed up! Redirecting...</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number"
          value={formData.phone}
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#3498db' }}>Login</span>
      </p>
    </div>
  );
};

export default SignUp;