// index.js
const app = require('./app');
const dotenv = require('dotenv');
const { connectDB } = require('./utils/db');

dotenv.config();

// Connect to MongoDB and start server after connection is established
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  });