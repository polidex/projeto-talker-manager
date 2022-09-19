const express = require('express');
const { randomBytes } = require('crypto');
const loginValidator = require('../utils/loginValidator');

const routerLogin = express.Router();

routerLogin.post('/', loginValidator, (_req, res) => {
    const token = randomBytes(8).toString('hex');
    return res.status(200).json({ token });
});

module.exports = routerLogin;
