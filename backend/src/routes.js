const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

const AuthController = require('./controllers/AuthController');

const SpotController = require('./controllers/SpotController');

const DashboardController = require('./controllers/DashboardController');

const BookingController = require('./controllers/BookingController');

routes.post('/auth', AuthController.store);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:id/bookings', BookingController.store);

module.exports = routes;