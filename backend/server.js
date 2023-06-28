require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const equipmentRoutes = require('./routes/equipments');
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');

const app = express();

//parse requests
app.use(express.json());

//log all requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/equipments', equipmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/bookings', bookingRoutes);

// connect to mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    console.log('connected to mongo DB');
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
