import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

export default api


// const API_URL = import.meta.env.VITE_API_URL;
// import axios from "axios";

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// export default api;