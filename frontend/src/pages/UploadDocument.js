import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadDocument.css";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(""); // Reset error on file change
    setSuccessMessage(""); // Reset success message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const fileType = file.type;
    if (!["application/pdf", "application/vnd.ms-powerpoint", "text/csv"].includes(fileType)) {
      setError("Unsupported file type. Please upload PDF, PPT, or CSV files.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8001/api/documents/upload/?token=${token}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setSuccessMessage(response.data.message);
      setFile(null);

      // Start indexing process
      setIndexing(true);
      await indexDocuments();

      // Redirect to the QueryNLP page after indexing
      navigate("/query");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  const indexDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8001/api/nlp/index/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Document indexed successfully!");
    } catch (err) {
      setError("Error indexing document.");
    } finally {
      setIndexing(false);
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
            <button type="submit" className="btn" disabled={loading || indexing}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

        {/* Show spinner during indexing */}
        {indexing && (
          <div className="loader-container">
            <div className="loader"></div>
            <p className="loading-message">Hold on, we are reading your document</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocument;
