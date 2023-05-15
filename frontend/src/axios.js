import axios from 'axios';

const baseURL = 'https://bloodclinic.mooo.com/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
  },
});

export default axiosInstance;