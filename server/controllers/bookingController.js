
const Booking = require('../models/Booking');
const Tour = require('../models/Tour');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private/User
exports.createBooking = async (req, res) => {
  const { tourId } = req.body;

  try {
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ msg: 'ট্যুর খুঁজে পাওয়া যায়নি' });
    }

    // Check if there are available seats
    if (tour.availableSeats <= 0) {
      return res.status(400).json({ msg: 'দুঃখিত, এই ট্যুরে আর কোন আসন খালি নেই' });
    }

    const newBooking = new Booking({
      tour: tourId,
      user: req.user.id
    });

    const booking = await newBooking.save();

    // Decrement available seats
    tour.availableSeats -= 1;
    await tour.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings/my-bookings
// @access  Private/User
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('tour', 'title location price');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tour', 'title').populate('user', 'username email phone password');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    let booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'বুকিং খুঁজে পাওয়া যায়নি' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private/User
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'বুকিং খুঁজে পাওয়া যায়নি' });
    }

    // Make sure user owns the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'এই বুকিং বাতিল করার অনুমতি আপনার নেই' });
    }

    // If booking is already confirmed, it cannot be cancelled by user, only by admin
    if(booking.status === 'confirmed'){
        return res.status(400).json({ msg: 'নিশ্চিত করা বুকিং বাতিল করা যাবে না। অনুগ্রহ করে সাপোর্টে যোগাযোগ করুন' });
    }

    await booking.remove();

    // Increment available seats
    const tour = await Tour.findById(booking.tour);
    if (tour) {
      tour.availableSeats += 1;
      await tour.save();
    }

    res.json({ msg: 'বুকিং সফলভাবে বাতিল করা হয়েছে' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};
