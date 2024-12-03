// src/config/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL do backend
});

export default api;
