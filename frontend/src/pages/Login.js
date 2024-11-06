import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Assuming you have a separate CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8001/api/users/login/', {
        username,
        password,
      });

      // Store token in localStorage or sessionStorage
      localStorage.setItem('token', response.data.access_token);

      // Redirect or handle success
      alert('Login Successful!');
      // You can redirect to dashboard or home page here
    } catch (err) {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setUsername('guest');
    setPassword('guestpassword');
    handleSubmit();
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="page-heading" style={{ fontFamily: "'Pacifico', cursive" }}>
          LogIn
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="btn-container">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
        <p className="toggle-form">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <hr style={{ border: '0', height: '1px', backgroundColor: '#6c757d', margin: '20px 0' }} />
        <div className="guest-section">
          <p>Are you a Hiring Manager/Recruiter?</p>
          <button className="guest-btn" onClick={handleGuestLogin}>
            Guest Login (prefilled credentials)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
