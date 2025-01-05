import axios from "axios";

const api = axios.create({
  baseURL: "http://3.86.239.62:8000",
});

export default api;
