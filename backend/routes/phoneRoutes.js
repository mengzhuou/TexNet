const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");
const limiter = require('../middleware/rateLimiter');

router.get('/phone_numbers', limiter, phoneController.getOwnedPhoneNumbers);
router.get('/available_phone_numbers', limiter, phoneController.getAvailablePhoneNumbers);
router.get('/balance', limiter, phoneController.getAccountBalance);

module.exports = router;