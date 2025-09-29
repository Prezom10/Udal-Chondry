
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  // Basic validation for role
  if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ msg: 'অবৈধ ভূমিকা' });
  }

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' });
    }

    user.role = role;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};
