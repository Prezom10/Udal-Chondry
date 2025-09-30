import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
// const API_URL = '${process.env.REACT_APP_BACKEND_URL}/api';
// const API_URL = process.env.REACT_APP_API_URL;

// Booking related
const getAllBookings = (token) => {
  return axios.get(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateBookingStatus = (id, status, token) => {
  return axios.put(`${API_URL}/bookings/${id}`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// User related
const getAllUsers = (token) => {
    return axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const updateUserRole = (id, role, token) => {
    return axios.put(`${API_URL}/users/${id}/role`, { role }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const adminService = {
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
  updateUserRole,
};

export default adminService;