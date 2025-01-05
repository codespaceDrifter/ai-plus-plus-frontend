import axios from "axios";

const api = axios.create({
  baseURL: "https://api.ai-plus-plus.com",
});

export default api;
