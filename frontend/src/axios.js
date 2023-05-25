import axios from 'axios';

// const baseURL = 'https://bloodclinic.mooo.com/';
const baseURL = 'http://127.0.0.1:8000/'; 


const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem('access_token') ? "Bearer " + String(localStorage.getItem('access_token')).slice(1,-1): null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export default axiosInstance;