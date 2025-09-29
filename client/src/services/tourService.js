
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tours';

// Get all tours
const getAllTours = () => {
  return axios.get(API_URL);
};

// Get a single tour by ID
const getTourById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Create a new tour (Admin)
const createTour = (tourData, token) => {
  return axios.post(API_URL, tourData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update a tour (Admin)
const updateTour = (id, tourData, token) => {
  return axios.put(`${API_URL}/${id}`, tourData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete a tour (Admin)
const deleteTour = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const tourService = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};

export default tourService;
