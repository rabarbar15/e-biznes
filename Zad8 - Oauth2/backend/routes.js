const express = require('express');
const router = express.Router();

const { signup, signin, authConfirm, logout, getUser } = require('./authController');
const { requireAuth } = require('./authMiddleware');

router.route('/signup')
  .post(signup)

router.route('/signin')
  .post(signin)

router.route('/logout')
  .get(logout)

router.route('/authConfirm')
  .get(requireAuth, authConfirm)

module.exports = router