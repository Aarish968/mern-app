const mongoose = require('mongoose');

const connectDB = async () => {
  console.log(process.env.MONGODB_URI);
  console.log("Connecting to MongoDB");
  try {
    console.log("Before connection");
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("After connection");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
