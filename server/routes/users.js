
const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes in this file are protected and for admins only
router.use(protect, authorize('admin'));

router.route('/').get(getAllUsers);
router.route('/:id/role').put(updateUserRole);

module.exports = router;
