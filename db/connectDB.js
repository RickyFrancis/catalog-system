const mongoose = require('mongoose');

const mongoURI = process.env.mongoURI || 'mongodb://localhost/catalog-system';

const connectDB = () => {
  try {
    mongoose.connect(process.env.mongoURI || 'mongodb://localhost/catalog-system', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true }, () => {
      console.log('Connected to Database');
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;