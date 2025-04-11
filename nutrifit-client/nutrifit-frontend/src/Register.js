import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Added import

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
    axios.post('http://localhost:3001/register', user)
      .then(res => alert(res.data.message))
      .catch(err => alert("Error: " + err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>

      {/* Login Link */}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
  );
}

export default Register;