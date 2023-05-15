import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
  },
});

export default axiosInstance;