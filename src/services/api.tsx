import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:27017",
  // baseURL: "https://precious-tarsier-661a39.netlify.app",
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  }
});
export default api;