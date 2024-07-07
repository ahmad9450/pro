// authController.js

const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Display profile page
exports.getProfilePage = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const posts = await Post.find({ userId: user._id });

    res.render('profile', { user, posts });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send('Server Error');
  }
};

// Display login form
exports.getLoginPage = (req, res) => {
  res.render('login', { message: req.flash('error') || '' });
};

// Handle login form submission
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      req.flash('error', 'Username or password is incorrect.');
      return res.redirect('/auth/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash('error', 'Username or password is incorrect.');
      return res.redirect('/auth/login');
    }

    req.session.user = user; // Set authenticated user in session

    res.redirect('/feed'); // Redirect to feed page after successful login
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server Error');
  }
};

// Display register form
exports.getRegisterPage = (req, res) => {
  res.render('register', { message: req.flash('error') || '' });
};

// Process registration form
exports.register = async (req, res) => {
  const { fullName, username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      req.flash('error', 'Username already exists.');
      return res.redirect('/auth/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ fullName, username, password: hashedPassword });
    await user.save();

    res.redirect('/feed'); // Redirect to feed page after successful registration
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Server Error');
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).send('Server Error');
    }
    res.redirect('/'); // Redirect to homepage after logout
  });
};