const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/feed', postController.getPosts);
router.get('/profile', authController.getProfilePage);

// Route to render the create post page
router.get('/posts/create', (req, res) => {
  res.render('createPost');
});

module.exports = router;