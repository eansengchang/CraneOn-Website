const express = require('express');

const {
  getUserBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
} = require('../controllers/bookingController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//need authentication for all the requests
router.use(requireAuth);

//GET all bookings of a user
router.get('/', getUserBookings);

//GET a booking
router.get('/:id', getBooking);

//POST booking
router.post('/', createBooking);

//DELETE booking
router.delete('/:id', deleteBooking);

//UPDATE booking
router.patch('/:id', updateBooking);

module.exports = router;
