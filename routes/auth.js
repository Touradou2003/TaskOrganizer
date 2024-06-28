// routes/authentification.js
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/authentification');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/me', auth, userController.updateProfile);

module.exports = router;
