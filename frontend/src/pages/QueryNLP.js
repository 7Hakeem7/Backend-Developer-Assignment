// src/pages/QueryNLP.js

import React, { useState } from "react";
import axios from "axios";
import "./QueryNLP.css";

const QueryNLP = () => {
  const [query, setQuery] = useState(""); // To store user query
  const [response, setResponse] = useState(""); // To store response from the backend
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(""); // To track any errors

  // Handle input change for the query text box
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission for querying
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(""); // Clear any previous error

    if (!query.trim()) {
      setLoading(false);
      setError("Please enter a valid query.");
      return;
    }

    try {
      // Send the query to the backend
      const response = await axios.get("http://localhost:8001/api/nlp/query", {
        params: {
          query: query,
        },
      });
      setResponse(response.data.answer || "No relevant answer found."); // Set response from the API or a default message if no answer
    } catch (err) {
      // Handle errors from the API
      setError("Error fetching the answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-container">
      <h2>Query the Documents</h2>
      <form onSubmit={handleSubmit} className="query-form">
        <div className="form-group">
          <label htmlFor="query">Enter your query:</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={handleChange}
            placeholder="Ask a question about the documents"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit Query"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {response && !error && (
        <div className="query-response">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default QueryNLP;
