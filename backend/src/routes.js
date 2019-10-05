const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

const AuthController = require('./controllers/AuthController');

const SpotController = require('./controllers/SpotController');

const BookingController = require('./controllers/BookingController');

const DashboardController = require('./controllers/DashboardController');

const ApprovalController = require('./controllers/ApprovalController');

const RejectionController = require('./controllers/RejectionController');

routes.post('/auth', AuthController.store);

routes.get('/spots', SpotController.index);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.post('/spots/:id/bookings', BookingController.store);

routes.post('/bookings/:id/rejections', RejectionController.store);

routes.post('/bookings/:id/approvals', ApprovalController.store);

routes.get('/dashboard', DashboardController.show);

module.exports = routes;