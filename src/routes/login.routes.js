const express = require('express');
const { randomBytes } = require('crypto');
const loginValidator = require('../utils/loginValidator');

const routerLogin = express.Router();

routerLogin.use(loginValidator);

routerLogin.post('/login', (req, res) => {
  // const { email, password } = req.body;
  // if (email && password) {
    const token = randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  // }
});

module.exports = routerLogin;
