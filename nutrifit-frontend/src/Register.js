import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/register', user)
      .then(res => {
        console.log("Response:", res);
        if (res.data.message) {
          alert(res.data.message);
        } else {
          alert("No message received");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error: " + (err.response ? err.response.data : err.message));
      });
  };

  // Inline style objects
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(/images/gym-background.jpg)',  // Use your gym-themed image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    color: 'white',  // Text color for contrast on the background
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Darken the form background for contrast
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: '#4CAF50',
  };

  return (
    <div style={containerStyle}>
      {/* NutriFit Title outside the container */}
      <h1 style={{ color: 'white', textAlign: 'center', fontSize: '36px', position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)' }}>NutriFit</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={user.name} 
          onChange={handleChange} 
          required 
          style={inputStyle}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={user.email} 
          onChange={handleChange} 
          required 
          style={inputStyle}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={user.password} 
          onChange={handleChange} 
          required 
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={linkStyle}>Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;