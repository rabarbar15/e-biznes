const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, getBookImg } = require('./controllers/bookController')
const { getAllOrders, createOrder, getOrderItems } = require('./controllers/orderController')
const { createUser, getUserById, } = require('./controllers/userController')
const { signup, signin, authConfirm, logout, getUser } = require('./controllers/authController');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


router.route('/books')
  .get(requireAuth, getAllBooks)

router.route('/books/:id')
  .get(getBookById)

router.route('/orders')
  .post(checkUser, createOrder)
  .get(checkUser, getAllOrders)

router.route('/orderItems/:id')
  .get(requireAuth, getOrderItems)

router.route('/users')
  .post(createUser)

router.route('/users/:id')
  .get(getUserById)

router.route('/signup')
  .post(signup)

router.route('/signin')
  .post(signin)

router.route('/logout')
  .get(logout)

router.route('/authConfirm')
  .get(requireAuth, authConfirm)

router.route('/user')
  .get(getUser)

router.route('/imgs/:id')
  .get(getBookImg)


module.exports = router