
const Tour = require('../models/Tour');

// @desc    Create a new tour
// @route   POST /api/tours
// @access  Private/Admin
exports.createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const tour = await newTour.save();
    res.status(201).json(tour);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Get single tour by ID
// @route   GET /api/tours/:id
// @access  Public
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: 'ট্যুর খুঁজে পাওয়া যায়নি' });
    }
    res.json(tour);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'ট্যুর খুঁজে পাওয়া যায়নি' });
    }
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Update a tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
exports.updateTour = async (req, res) => {
  try {
    let tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: 'ট্যুর খুঁজে পাওয়া যায়নি' });
    }

    tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.json(tour);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};

// @desc    Delete a tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: 'ট্যুর খুঁজে পাওয়া যায়নি' });
    }

    await tour.remove();

    res.json({ msg: 'ট্যুর সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('সার্ভার ত্রুটি');
  }
};
