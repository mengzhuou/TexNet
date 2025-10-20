const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");
const limiter = require('../middleware/rateLimiter');

// TelNyx api call
router.get('/phone_numbers', limiter, phoneController.getOwnedPhoneNumbers);
router.get('/available_phone_numbers', limiter, phoneController.getAvailablePhoneNumbers);
router.get('/balance', limiter, phoneController.getAccountBalance);

// MongoDB api call
router.post('/db/create_phone_number', limiter, phoneController.createNewPhoneNumber);
router.get('/db/phone_numbers', phoneController.getPhoneNumbersFromDB);

module.exports = router;