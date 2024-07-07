const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the middleware

router.get('/', postController.getPosts);
router.post('/create', authMiddleware, postController.createPost); // Use middleware to protect this route

module.exports = router;