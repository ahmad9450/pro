const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');

dotenv.config();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const indexRouter = require('./routes/indexRoutes');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ahmadraza',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Logging to identify middleware issue
console.log('Setting up routes...');

try {
  app.use('/', indexRouter);
  console.log('Index routes loaded');
} catch (error) {
  console.error('Error with index routes:', error);
}

try {
  app.use('/auth', authRoutes);
  console.log('Auth routes loaded');
} catch (error) {
  console.error('Error with auth routes:', error);
}

try {
  app.use('/posts', postRoutes);
  console.log('Post routes loaded');
} catch (error) {
  console.error('Error with post routes:', error);
}

module.exports = app;