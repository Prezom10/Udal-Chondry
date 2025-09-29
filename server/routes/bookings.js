
const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getAllBookings,
    updateBookingStatus,
    cancelBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

// User routes
router.route('/').post(protect, authorize('user'), createBooking);
router.route('/my-bookings').get(protect, authorize('user'), getMyBookings);
router.route('/:id').delete(protect, authorize('user', 'admin'), cancelBooking);

// Admin routes
router.route('/').get(protect, authorize('admin'), getAllBookings);
router.route('/:id').put(protect, authorize('admin'), updateBookingStatus);

module.exports = router;
