
import axios from 'axios';

const API_URL = 'https://bd-travel.onrender.com/api/auth';

const register = (username, email, phone, password) => {
  return axios.post(`${API_URL}/register`, {
    username,
    email,
    phone,
    password,
  });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};

const authService = {
  register,
  login,
};

export default authService;
