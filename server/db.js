const mongoose = require('mongoose');
const db =
  'mongodb+srv://yjchoi:yjchoi@catbutler-ttziq.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
