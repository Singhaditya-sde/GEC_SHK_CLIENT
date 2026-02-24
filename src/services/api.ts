// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // 🔥 REQUIRED for cookie
});

export default api;