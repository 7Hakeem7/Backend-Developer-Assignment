import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/users/register`, data);
  return response.data;
};

export const uploadDocument = async (formData) => {
  const response = await axios.post(`${API_URL}/documents/upload`, formData);
  return response.data;
};

export const queryNLP = async (queryParams) => {
  const response = await axios.get(`${API_URL}/nlp/query`, { params: queryParams });
  return response.data;
};
