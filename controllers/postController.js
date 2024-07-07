const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render('feed', { posts }); // Make sure you have a feed.ejs file
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Server Error');
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
      userId: req.session.user._id, // Ensure session user is set
    });
    await newPost.save();
    res.redirect('/posts'); // Redirect to posts feed after creation
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Server Error');
  }
};