const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const limiter = require('../middleware/rateLimiter');

router.get('/', limiter, userController.getUsers);
router.post('/', limiter, userController.createUser);
router.post('/login', limiter, userController.loginUser);
router.put('/:username/role', limiter, userController.updateUserRole);
router.put('/:username', limiter, userController.updateUserInfo);

module.exports = router;
