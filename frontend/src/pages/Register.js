import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // External styling for your component

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Validate the inputs (simple validation)
    if (!formData.username || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/api/users/register/", // Change this to your backend URL
        formData
      );
      setSuccessMessage("Registration successful!");
      setFormData({
        username: "",
        password: "",
      }); // Reset the form fields after successful registration
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="h2">Register</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>
        <div className="toggle-form">
          <p>
            Already have an account?{" "}
            <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
