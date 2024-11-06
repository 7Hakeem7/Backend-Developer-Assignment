// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // If user is logged in, navigate to the upload page
      navigate('/upload');
    } else {
      // If user is not logged in, navigate to the login page
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <div className="text-animation">
        <h1>Huge thanks to Team AI Planet for this amazing opportunity!</h1>
        <p>Your one-stop solution for intelligent document interaction!</p>
      </div>
      <button className="chat-button" onClick={handleChatButtonClick}>
        Chat With Your Document
      </button>
    </div>
  );
};

export default Home;
