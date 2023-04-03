import axios from 'axios';

const baseURL = '/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
  },
});

export default axiosInstance;