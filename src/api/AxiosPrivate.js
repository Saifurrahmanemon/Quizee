import Axios from 'axios';
import { TEST_URL } from './Api';

function authRequestInterceptor(config) {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

const axios = Axios.create({
  baseURL: TEST_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default axios;
