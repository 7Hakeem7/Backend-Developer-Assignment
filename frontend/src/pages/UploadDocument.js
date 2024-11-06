import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadDocument.css"; // External styling for your component

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(""); // Reset error on file change
    setSuccessMessage(""); // Reset success message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Check if a file is selected
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    // Check if the file type is valid (PDF, PPT, CSV)
    const fileType = file.type;
    if (!["application/pdf", "application/vnd.ms-powerpoint", "text/csv"].includes(fileType)) {
      setError("Unsupported file type. Please upload PDF, PPT, or CSV files.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token"); // Retrieve token with correct key
      const response = await axios.post(
        `http://localhost:8001/api/documents/upload/?token=${token}`, // Send token as a query parameter
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setSuccessMessage(response.data.message);
      setFile(null); // Reset file input after successful upload

      // Trigger the document indexing process after upload
      await indexDocuments(); // Wait for the indexing to complete

      // Redirect to the QueryNLP page after indexing
      navigate("/query"); // Ensure your routing is set up for this path
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  const indexDocuments = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token with correct key
      const response = await axios.post(
        "http://localhost:8001/api/nlp/index/", // Trigger document indexing
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token if required
          },
        }
      );
      setSuccessMessage("Document indexed successfully!");
    } catch (err) {
      setError("Error indexing document.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="h2">Upload Document</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="file">Choose a file (PDF, PPT, CSV)</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;
