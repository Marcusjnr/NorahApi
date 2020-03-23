const express = require('express');
const router = express.Router();
const {Register} = require('../../controllers/users/RegisterUserController');

router.post('/api/users/register', Register);

module.exports = router;