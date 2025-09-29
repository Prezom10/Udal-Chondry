
const express = require('express');
const router = express.Router();
const {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour
} = require('../controllers/tourController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getAllTours);
router.route('/:id').get(getTourById);

// Admin only routes
router.route('/').post(protect, authorize('admin'), createTour);
router.route('/:id')
  .put(protect, authorize('admin'), updateTour)
  .delete(protect, authorize('admin'), deleteTour);

module.exports = router;
