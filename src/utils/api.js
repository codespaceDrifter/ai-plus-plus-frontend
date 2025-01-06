import axios from "axios";

const development = false;

const api = axios.create({
  baseURL: development ? "http://localhost:8000" : "https://api.ai-plus-plus.com",
});

export default api;
