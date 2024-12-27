const express = require('express');
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');
const accessToken = require('../middleware/auth.middleware')

const router = express.Router();
router.use(express.json());

// Register Route
router.post(
  '/register',
  [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
  ],
  userController.registerUser
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  userController.loginUser
);

//Get all users
router.get('/', accessToken, userController.getAllUsers)

module.exports = router;