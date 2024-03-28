import axios from 'axios';

export const baseURL = 'https://proxystoreapi.azurewebsites.net/';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  config => {
    let token = localStorage.getItem('__token__')
    config.headers = {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;