
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

// Create a new booking
const createBooking = (tourId, token) => {
  return axios.post(API_URL, { tourId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get user's bookings
const getMyBookings = (token) => {
    return axios.get(`${API_URL}/my-bookings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const bookingService = {
  createBooking,
  getMyBookings,
};

export default bookingService;
