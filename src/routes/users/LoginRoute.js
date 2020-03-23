const express = require('express');
const router = express.Router();
const {Login} = require('../../controllers/users/LoginUserController');
const {LoginParamChecker} = require('../../middleware/parameter_checkers/LoginParameterChecker');

router.post('/api/users/login', LoginParamChecker,Login);

module.exports = router;