import axios from 'axios';

const baseURL = 'http://34.65.147.175/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
  },
});

export default axiosInstance;