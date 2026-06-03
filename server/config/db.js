const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    // Retry after 5 seconds
    setTimeout(connectDB, 5000);
    return false;
  }
};

module.exports = connectDB;