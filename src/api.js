// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // ou a URL do seu servidor
});

export default api;
