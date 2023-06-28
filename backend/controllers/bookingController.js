const bookingModel = require('../models/bookingModel');
const mongoose = require('mongoose');

// get bookings of a user
const getUserBookings = async (req, res) => {
  const user_id = req.user._id;
  const bookings = await bookingModel.find({ user_id });

  res.status(200).json(bookings);
};

// get a single booking
const getBooking = async (req, res) => {
  const { id } = req.params;
  //if id isnt valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'No such booking' });

  const booking = await bookingModel.findById(id);

  if (!booking) {
    return res.status(404).json({ error: 'No such booking' });
  }

  res.status(200).json(booking);
};

// create a booking
const createBooking = async (req, res) => {
  try {
    const user_id = req.user._id;

    const booking = await bookingModel.create({
      ...req.body,
      user_id,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  //if id isnt valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'No such booking' });

  const booking = await bookingModel.findById(id);
  if (!booking) {
    return res.status(404).json({ error: 'No such booking' });
  }
  if (booking.user_id != req.user._id) {
    res.status(401).json({ error: 'Request not authorized' });
  }

  const deletedBooking = await bookingModel.findOneAndDelete({ _id: id });

  res.status(200).json(deletedBooking);
};

// update a booking
const updateBooking = async (req, res) => {
  const { id } = req.params;
  //if id isnt valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'No such booking' });

  const booking = await bookingModel.findById(id);
  if (!booking) {
    return res.status(404).json({ error: 'No such booking' });
  }
  if (booking.user_id != req.user._id) {
    res.status(401).json({ error: 'Request not authorized' });
  }

  const updatedBooking = await bookingModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  res.status(200).json(updatedBooking);
};

module.exports = {
  getUserBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
};
