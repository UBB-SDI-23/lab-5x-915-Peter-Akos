import axios from 'axios';

const baseURL = '34.65.147.175:80/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
  },
});

export default axiosInstance;